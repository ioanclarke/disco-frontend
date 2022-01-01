import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/notFound.css';

const NotFound = () => {
	return (
		<div className="page-container">
			<h1>Oops! Looks like this page doesn't exist</h1>
			<Link to="/" className="return-link">
				Return to home
			</Link>
		</div>
	);
};

export default NotFound;
