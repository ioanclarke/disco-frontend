import React, { useEffect, useState } from 'react';
import Bot from './Bot';
import discoAPIService from '../../services/discoAPI';

const Bots = ({ bots, showBotConfigWindow, token }) => {
	const [avatars, setAvatars] = useState({});

	const getBotAvatar = async id => {
		return await discoAPIService.getUserAvatar(id);
	};

	useEffect(() => {
		async function fetchAvatars() {
			let a = {};
			for (const bot of bots) {
				a[bot.botID] = await getBotAvatar(bot.botID);
			}
			// Couldn't get this working. Tried testing and it seems to be something to within the async function within .map, not sure though
			// const a = Object.fromEntries(
			// 	bots.map(async bot => [
			// 		bot.botID,
			// 		await getBotAvatar(bot.botID)
			// 	])
			// );
			// console.log(a);

			setAvatars(a);
		}

		fetchAvatars();
	}, [bots]);

	// bots = [];
	if (bots.length === 0)
		return <h2>There are no supported bots in this server</h2>;

	return (
		<div>
			{avatars && Object.keys(avatars).length > 0 ? (
				bots.map(bot => (
					<Bot
						key={bot.botID}
						bot={bot}
						showBotConfigWindow={showBotConfigWindow}
						avatar={avatars[bot.botID]}
					/>
				))
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default Bots;
