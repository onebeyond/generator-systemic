process.env.LIBER_ENV = process.env.LIBER_ENV || 'local';

const system = require('./system');
const runner = require('systemic-domain-runner');
const bunyan = require('bunyan');
const { name } = require('./package.json');

const emergencyLogger = process.env.LIBER_ENV === 'local' ? console : bunyan.createLogger({ name });

const die = (message, err) => {
	emergencyLogger.error(err, message);
	process.exit(1);
};

runner(system(), { logger: emergencyLogger }).start((err, components) => {
	if (err) die('Error starting system', err);
	const { logger, pkg } = components;
	logger.info(`${pkg.name} has started`);
});
