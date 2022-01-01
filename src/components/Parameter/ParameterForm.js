import React from 'react';
import Parameter from './Parameter';
import '../../static/css/parameterForm.css';

const ParameterForm = ({
	handleSaveChanges,
	bot,
	config,
	handleChange,
	showSaved
}) => {
	return (
		<form onSubmit={handleSaveChanges} className="parameter-form">
			{bot.config.map(parameter => (
				<Parameter
					key={parameter.name}
					parameterName={parameter.name}
					parameterDescription={parameter.description}
					parameterValue={parameter.value}
					text={
						config.find(param => param.name === parameter.name)
							.value
					}
					handleChange={handleChange}
				/>
			))}
			<button type="submit" className="save-button">
				Save
			</button>
			{showSaved && <span className="saved-notification">Saved</span>}
		</form>
	);
};

export default ParameterForm;
