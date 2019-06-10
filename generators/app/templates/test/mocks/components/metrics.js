const debug = require('debug')('mock:metrics');

module.exports = () => ({
	trackMetric: event => {
		debug(`Monitor ${event.name}`);
	},
});
