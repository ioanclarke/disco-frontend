import React, { useEffect, useState } from 'react';
import {
	Route,
	Switch,
	useHistory,
	useLocation,
	useRouteMatch
} from 'react-router-dom';
import randomBytes from 'random-bytes';

import './static/css/app.css';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home';
import Guilds from './components/Guild/Guilds';
import Guild from './components/Guild/Guild';
import NotFound from './components/NotFound';
import Login from './components/Login';

import discordAPIService from './services/discordAPI';
import fetchToken from './utils/fetchToken';

const App = () => {
	const [token, setToken] = useState(null);
	const [guilds, setGuilds] = useState(null);
	const [user, setUser] = useState(null);
	const [discordLoginURL, setDiscordLoginURL] = useState(null);

	const history = useHistory();
	const location = useLocation();

	const match = useRouteMatch('/servers/:id');

	let guild;
	if (guilds) {
		guild = match
			? guilds.find(guild => guild.id === match.params.id)
			: null;
	}

	useEffect(() => {
		if (token) return null;

		fetchToken(location.search)
			.then(async response => {
				if (response) {
					setToken(response);

					history.push('/');
					await getUser(response);
					await getGuilds(response);
				}
			})
			.catch(() => {
				console.log('Could not retrieve token');
			});
	}, [history, location.search, token]);

	useEffect(() => {
		const discordLoginBaseURL =
			'https://discord.com/api/oauth2/authorize?' + ///
			'client_id=862356663351377952' +
			`&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
			'&response_type=code' +
			'&scope=guilds%20identify' +
			'&prompt=none';

		
		const state = randomBytes.sync(16).toString('hex');

		localStorage.setItem('oauth2-state', state);

		setDiscordLoginURL(discordLoginBaseURL + '&state=' + state);
	}, []);

	const getGuilds = async localToken => {
		if (!localToken) {
			console.log('Need token before retrieving guilds');
			return;
		}
		const response = await discordAPIService.getGuilds(localToken);
		setGuilds(response);

	};

	const getUser = async localToken => {
		if (!localToken) {
			console.log('Need token before retrieving username');
			return;
		}

		const response = await discordAPIService.getUser(localToken);
		setUser(response);
	};

	const handleLogIn = () => {
		console.log('inside handleLogIn');

		window.location.href = discordLoginURL;
	};

	const handleLogOut = async () => {

		history.push('/');
		await discordAPIService.revokeToken(token);
		setToken(null);
		setUser(null);
	};

	return (
		<div className="app">
			<NavBar
				token={token}
				handleLogIn={handleLogIn}
				handleLogOut={handleLogOut}
				user={user}
			/>

			<Switch>
				<Route path="/servers/:id">
					{token ? (
						<Guild guild={guild} token={token} />
					) : (
						<Login discordLoginURL={discordLoginURL} />
					)}
				</Route>

				<Route path="/servers">
					{token ? (
						<Guilds guilds={guilds} />
					) : (
						<Login discordLoginURL={discordLoginURL} />
					)}
				</Route>

				<Route exact path="/">
					<Home />
				</Route>

				{/* Code to handle 404 error in React
				    Taken from an article by Todd Motto, posted 25 May 2020
					Accessed 21 August 2021
					https://ultimatecourses.com/blog/react-router-not-found-component */}
				<Route>
					<NotFound />
				</Route>
				{/* End of referenced code */}
			</Switch>
		</div>
	);
};

export default App;
