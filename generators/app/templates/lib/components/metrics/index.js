const System = require('systemic');
const initMetrics = require('systemic-azure-metrics');

module.exports = new System({ name: 'metrics' }).add('metrics', initMetrics()).dependsOn('config');
