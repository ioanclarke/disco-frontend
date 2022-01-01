import axios from 'axios';

const ConfigInDatabaseURL = `${process.env.REACT_APP_API_URL}/api/db/config`;
const discordAPIURL = `${process.env.REACT_APP_API_URL}/api/discord`;

const getBots = async guildID => {
	const response = await axios.get(
		`${ConfigInDatabaseURL}/?guildID=${guildID}`
	);

	return response.data;
};

const updateBot = async (botID, guildID, newConfig, token) => {
	const configID = botID + 'x' + guildID;

	const data = {
		newConfig
	};
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const URL = `${ConfigInDatabaseURL}/${configID}`;
	const response = await axios.put(URL, data, config);
	return response.data;
};

const getAuthcode = async (token, guildID) => {
	console.log(
		`Getting authcode for guild with ID ${guildID} using token ${token}`
	);
	const response = await axios.get(
		`${ConfigInDatabaseURL}/authcode/?token=${token}&guildID=${guildID}`
	);

	return response.data.savedAuthcode.code;
};

const getUserAvatar = async id => {
	const response = await axios.get(`${discordAPIURL}/user/${id}`);
	return response.data;
};

const exports = { getBots, updateBot, getAuthcode, getUserAvatar };
export default exports;
