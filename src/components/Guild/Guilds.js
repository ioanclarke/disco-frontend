import React from 'react';
import '../../static/css/guilds.css';
import GuildLink from './GuildLink';

const Guilds = ({ guilds }) => {
	if (!guilds) return <h1>Loading...</h1>;

	const isAdminOfGuild = guild => (guild.permissions & 8) === 8;

	return (
		<div className="page-container">
			<h1>Your servers</h1>
			<div className="server-list">
				{guilds
					.filter(guild => isAdminOfGuild(guild))
					.map(guild => (
						<GuildLink key={guild.id} guild={guild} />
					))}
			</div>
		</div>
	);
};

export default Guilds;
