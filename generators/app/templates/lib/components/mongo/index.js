const System = require('systemic')
const mongodb = require('systemic-mongodb')

module.exports = new System()
    .add('mongodb', mongodb()).dependsOn('config', 'logger')
