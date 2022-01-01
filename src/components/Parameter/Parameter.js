import React from 'react';
import '../../static/css/parameters.css';

const Parameter = ({
	parameterName,
	parameterDescription,
	parameterValue,
	text,
	handleChange
}) => (
	<div className="parameter-container">
		<div>
			<div className="parameter-name">{parameterName}</div>
			<div className="parameter-description" style={{opacity: '100%'}}>{parameterDescription}</div>
		</div>
		<input
			type="text"
			name={parameterName}
			value={text}
			onChange={handleChange}
			className="parameter-input"
		/>
	</div>
);

export default Parameter;
