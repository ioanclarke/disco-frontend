import React from 'react';

const ProfilePicture = ({ user }) => {
	const discordCDNURL = 'https://cdn.discordapp.com';

	// noinspection JSUnresolvedVariable
	return (
		<img
			src={`${discordCDNURL}/avatars/${user.id}/${user.avatar}.png`}
			alt="Profile"
			className="profile-picture"
		/>
	);
};

export default ProfilePicture;
