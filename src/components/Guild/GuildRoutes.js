import React from 'react';
import { Route } from 'react-router-dom';
import Guild from './Guild';

const GuildRoutes = ({ guilds, token, discordLoginURL }) => {
	return (
		<>
			{guilds &&
				guilds
					.filter(guild => (guild.permissions & 8) === 8)
					.map(guild => (
						<Route key={guild.id} path={'/guilds/' + guild.id}>
							<Guild
								guild={guild}
								token={token}
								discordLoginURL={discordLoginURL}
							/>
						</Route>
					))}
		</>
	);
};

export default GuildRoutes;
