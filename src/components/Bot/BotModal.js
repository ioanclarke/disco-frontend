import React, { useState } from 'react';
import '../../static/css/botModal.css';
import discoService from '../../services/discoAPI';
import ParameterForm from '../Parameter/ParameterForm';

const BotModal = ({ bot, closeModal, guildID, token }) => {

	const [config, setConfig] = useState(bot.config);
	const [showSaved, setShowSaved] = useState(false);

	const handleSaveChanges = async e => {
		e.preventDefault();
		try {
			await discoService.updateBot(bot.botID, guildID, config, token);
			setShowSaved(true);
			setTimeout(() => setShowSaved(false), 2000);
		} catch (e) {
			alert('Could not save');
		}
	};

	const handleChange = e => {
		const newConfig = config.map(parameter =>
			parameter.name !== e.target.name
				? parameter
				: {
						...parameter,
						value: e.target.value
				  }
		);

		setConfig(newConfig);
	};

	return (
		<div id="botModal" className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title">
						Configuration for <i>{bot.botName}</i>
					</h2>
					<button className="close-modal" onClick={closeModal}>
						{/*&times;*/}X
					</button>
				</div>
				<ParameterForm
					handleSaveChanges={handleSaveChanges}
					bot={bot}
					config={config}
					handleChange={handleChange}
					showSaved={showSaved}
				/>
			</div>
		</div>
	);
};

export default BotModal;
