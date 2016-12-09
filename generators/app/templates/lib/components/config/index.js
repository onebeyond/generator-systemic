const System = require('systemic')
const confabulous = require('./confabulous')

module.exports = new System()
    .add('config', confabulous(), { scoped: true })
