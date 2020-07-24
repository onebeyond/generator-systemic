module.exports = () => {
	const start = async ({ logger, store }) => {
		const format = message => ({
			id: message.id,
			text: message.text.toUpperCase(),
			receptionTimestamp: message.receptionTimestamp,
		});

		const getMessage = async id => {
			try {
				const message = await store.getMessage(id);
				return message ? format(message) : null;
			} catch (error) {
				logger.error(`Error retrieving message from DB --> ${error.message}`);
				throw error;
			}
		};

		return {
			getMessage,
		};
	};

	return { start };
};
