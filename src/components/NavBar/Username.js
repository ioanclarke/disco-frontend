import React from 'react';

const Username = ({ user }) => (
	<div className="nav-item username-container">
		{user.username + '#' + user.discriminator}
	</div>
);

export default Username;
