import React from 'react';
import logo from '../../static/img/disco-logo.png';

/* TODO add reference for disco ball https://www.iconfinder.com/search?q=discoball&price=free*/

const Logo = () => (
	<a href="/" className="logo-container">
		<img src={logo} alt="disco logo" className="logo" />
	</a>
);

export default Logo;
