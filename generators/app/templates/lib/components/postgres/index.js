const System = require('systemic')
const migrator = require('./migrator')
const postgres = require('systemic-pg')

module.exports = new System()
    .add('postgres-migrator', migrator()).dependsOn({ component: 'config', source: 'postgres', destination: 'config.postgres' })
    .add('postgres', postgres()).dependsOn('config', 'logger', 'postgres-migrator')
