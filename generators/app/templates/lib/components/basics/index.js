const System = require('systemic')
const optional = require('optional')
const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const manifest = optional(path.join(process.cwd(), 'manifest.json')) || {}

module.exports = new System()
    .add('pkg', pkg)
    .add('manifest', manifest)

