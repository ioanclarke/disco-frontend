import React from 'react';

const Login = ({ discordLoginURL }) => {
	// Code to redirect to external URL in React Router
	// Adapted from an article by Sai gowtham, posted 10 November 2020
	// Accessed 12 July 2021
	https://stackoverflow.com/a/65007703/15394129
	window.location.href = discordLoginURL;
	// End of referenced code

	return <h1>Redirecting to login page</h1>;
};

export default Login;
