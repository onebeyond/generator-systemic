const System = require('systemic');
const confabulous = require('./confabulous');

module.exports = new System({ name: 'config' }).add('config', confabulous(), { scoped: true });
