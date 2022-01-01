import React, { useEffect, useState } from 'react';
import discoService from '../../services/discoAPI';
import BotModal from '../Bot/BotModal';
import '../../static/css/guilds.css';
import Bots from '../Bot/Bots';

const Guild = ({ guild, token, discordLoginURL }) => {
	const [bots, setBots] = useState(null);
	const [currentBot, setCurrentBot] = useState(null);
	const [showBotModal, setShowBotModal] = useState(false);
	const [authcode, setAuthcode] = useState(null);



	if (!token) window.location.href = discordLoginURL;


	useEffect(() => {
		discoService
			.getBots(guild.id)
			.then(response => setBots(response))
			.catch(err => console.log(err));

		// Code to fix 'Can't perform a React state update on an unmounted component' error
		// Taken from StackOverflow answer by Carlos Vallejo, posted 25 November 2020
		// Accessed 15 July 2021
		// https://stackoverflow.com/a/65007703/15394129
		return () => {
			setBots({});
		};
		// End of referenced code
	}, [guild.id]);

	const checkBotsAreLoaded = () => bots && bots.constructor === Array;

	const showBotConfigWindow = bot => {
		setCurrentBot(bot);
		setShowBotModal(true);

	};

	const generateAuthcode = async () => {
		const code = await discoService.getAuthcode(token, guild.id);
		setAuthcode(code);

	};

	return (
		<div className="page-container">
			<h1>
				Registered bots in <i>{guild.name}</i>
			</h1>
			{showBotModal && (
				<BotModal
					closeModal={() => setShowBotModal(false)}
					bot={currentBot}
					guildID={guild.id}
					token={token}
				/>
			)}

			{checkBotsAreLoaded() ? (
				<Bots showBotConfigWindow={showBotConfigWindow} bots={bots} />
			) : (
				<h2>Loading...</h2>
			)}
			{/*<button onClick={generateAuthcode}>*/}
			{/*	Generate authorization code*/}
			{/*</button>*/}
			{authcode && <div>{authcode}</div>}
		</div>
	);
};

export default Guild;
