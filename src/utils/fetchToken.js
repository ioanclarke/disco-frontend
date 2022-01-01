import discordAPIService from '../services/discordAPI';

const fetchToken = async url => {
	// Code to get parameters value from query string
	// Adapted from a StackOverflow answer by Christian, posted 1 June 2016
	// Accessed 31 August 2021
	// https://stackoverflow.com/a/37568368/15394129
	const params = new URLSearchParams(url);
	const code = params.get('code');
	// End of referenced code
	if (code && localStorage.getItem('oauth2-state') === params.get('state')) {
		try {
			return await discordAPIService.getToken(code);
		} catch (e) {
			console.log(e);
		}
	} else {
		return null;
	}
};

export default fetchToken;
