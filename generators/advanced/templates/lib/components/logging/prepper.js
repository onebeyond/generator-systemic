const R = require('ramda');
const Prepper = require('prepper');

module.exports = ({ prepper, transport } = {}) => {
	const prepperFn = prepper || Prepper;
	const { handlers } = prepperFn;

	const start = async ({ config, transports, pkg = { name: 'unknown' } }) => {
		const transportFn = transport || R.path([config.transport], transports);
		const finalConfig = R.merge({ include: [], exclude: [] }, config);
		const logger = new prepperFn.Logger({
			handlers: [
				new handlers.Merge({ package: pkg }),
				new handlers.Merge({ service: { env: process.env.SERVICE_ENV } }),
				new handlers.Process(),
				new handlers.System(),
				new handlers.Timestamp(),
				new handlers.Flatten(),
				new handlers.KeyFilter({ include: finalConfig.include, exclude: finalConfig.exclude }),
				new handlers.Unflatten(),
			],
		}).on('message', event => {
			if (transportFn) transportFn(event);
		});

		return logger;
	};

	return { start };
};
