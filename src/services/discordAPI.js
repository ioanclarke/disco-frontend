import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_URL}/api/discord`;
const discordAPIURL = 'https://discord.com/api';

const getToken = async code => {
	const response = await axios.post(`${baseURL}/token`, { code });
	return response.data;
};

const revokeToken = async token => {
	await axios.post(`${baseURL}/token/revoke`, { token });
};

const getGuilds = async token => {
	try {
		const response = await axios.get(`${discordAPIURL}/users/@me/guilds`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (e) {
		console.log('Could not get guilds');
		console.log(e);
	}
};

const getUser = async token => {
	try {
		const response = await axios.get(`${discordAPIURL}/users/@me`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (e) {
		console.log('Could not get user');
		console.log(e);
	}
};

const exports = { getToken, revokeToken, getGuilds, getUser };
export default exports;
