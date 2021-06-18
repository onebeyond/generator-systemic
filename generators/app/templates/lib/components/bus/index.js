const System = require('systemic');
const rabbitmq = require('systemic-rabbitmq');
const initBus = require('./initBus');

module.exports = new System({ name: 'bus' })
  .add('rabbitmq', rabbitmq())
  .dependsOn('config', 'logger')
  .add('bus', initBus())
  .dependsOn('rabbitmq');
