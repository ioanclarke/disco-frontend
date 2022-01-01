import React from 'react';
import { Link } from 'react-router-dom';

const NavBarItem = ({ path, label }) => (
	<Link to={path} className="nav-item nav-item-link">
		{label}
	</Link>
);

export default NavBarItem;
