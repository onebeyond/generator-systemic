const System = require('systemic');
const mongodb = require('systemic-mongodb');
const initStore = require('./initStore');

module.exports = new System({ name: 'store' })
	.add('mongodb', mongodb())
	.dependsOn('config', 'logger')
	.add('store', initStore())
	.dependsOn('mongodb', 'config', 'logger');
