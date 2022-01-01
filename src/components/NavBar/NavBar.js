import React from 'react';
import '../../static/css/navbar.css';
import NavBarItem from './NavBarItem';
import LoginButton from './LoginButton';
import Logo from './Logo';
import ProfilePicture from './ProfilePicture';
import Username from './Username';

const NavBar = ({ token, handleLogIn, handleLogOut, user }) => {
	return (
		<nav className="nav-bar">
			{/* TODO add reference for disco ball https://www.iconfinder.com/search?q=discoball&price=free*/}
			<Logo />

			<div className="divider" />

			<div className="link-container">
				<NavBarItem path="/" label="Home" />
				{token && <NavBarItem path="/servers" label="Your servers" />}
			</div>

			<div className="right-aligned-container">
				{user && user.avatar && <ProfilePicture user={user} />}
				{user && <Username user={user} />}
			</div>
			<LoginButton
				token={token}
				handleLogIn={handleLogIn}
				handleLogOut={handleLogOut}
			/>
		</nav>
	);
};

export default NavBar;
