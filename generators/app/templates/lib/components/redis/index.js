const System = require('systemic')
const redis = require('systemic-redis')

module.exports = new System()
    .add('redis', redis()).dependsOn('config', 'logger')
