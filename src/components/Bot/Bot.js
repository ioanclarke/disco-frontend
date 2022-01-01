import React from 'react';
import '../../static/css/bot.css';

const Bot = ({ bot, showBotConfigWindow, avatar }) => {
	const discordCDNURL = 'https://cdn.discordapp.com';

	// noinspection JSUnresolvedVariable
	return (
		// TODO figure out why the height of a bot listing doesn't match a
		//  server listing when a bot listing is set semantically correctly as a button
		<a
			key={bot.botID}
			className="list-item bot-listing"
			onClick={() => showBotConfigWindow(bot)}
			tabIndex={0}
		>
			{bot.botName}
			{/*TODO add bot icon to listing*/}
			<img
				src={`${discordCDNURL}/avatars/${bot.botID}/${avatar}.png`}
				alt={`${bot.botName}`}
				className="bot-icon"
			/>
		</a>
	);
};

export default Bot;
