module.exports = () => {
	const start = async ({ rabbitmq }) => {
		const publish = (...args) => new Promise((resolve, reject) => {
			rabbitmq.broker.publish(...args, (err, publication) => {
				if (err) return reject(err);
				return publication
					.on('success', () => resolve())
					.on('error', reject);
			});
		});

		const subscribe = (...args) => new Promise((resolve, reject) => {
			rabbitmq.broker.subscribe(...args, (err, subscription) => {
				if (err) return reject(err);
				const cancel = new Promise(subscription.cancel);
				return subscription
					.on('message', (message, content, ackOrNack) => resolve({
						message, content, ackOrNack, cancel,
					}))
					.on('error', reject);
			});
		});

		return {
			publish,
			subscribe,
		};
	};

	return { start };
};
