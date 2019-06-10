const debug = require('debug')('mock:logger');

const dummyLog = (level, text) => debug(`[${level}] ${text}`);

module.exports = () => ({
	debug: text => dummyLog('debug', text),
	info: text => dummyLog('info', text),
    warn: text => dummyLog('warn', text),
    error: text => dummyLog('error', text),
});