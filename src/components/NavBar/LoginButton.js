import React from 'react';

/*TODO fix handleLogOut so user isn't automatically redirected to login page again when on a login-only page*/
const LoginButton = ({ token, handleLogIn, handleLogOut }) => (
	<button
		onClick={token ? handleLogOut : handleLogIn}
		// href={token ? '#' : discordLoginURL}
		className="nav-item log-in-button"
	>
		{token ? 'Log out' : 'Log in with Discord'}
	</button>
);

export default LoginButton;
