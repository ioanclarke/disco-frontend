import React from 'react';
import { Link } from 'react-router-dom';

const GuildLink = ({ guild }) => {
	const discordCDNURL = 'https://cdn.discordapp.com';

	return (
		<Link key={guild.id} to={'/servers/' + guild.id} className="list-item">
			{guild.name}
			<img
				src={`${discordCDNURL}/icons/${guild.id}/${guild.icon}.png`}
				alt={`Logo for ${guild.name}`}
				className="server-logo"
			/>
		</Link>
	);
};

export default GuildLink;
