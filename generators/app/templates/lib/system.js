const System = require('systemic')
const path = require('path')

module.exports = new System().bootstrap(path.join(__dirname, 'components'))
