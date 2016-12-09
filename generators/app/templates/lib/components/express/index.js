const System = require('systemic')
const defaultMiddleware = require('systemic-express').defaultMiddleware
const app = require('systemic-express').app
const server = require('systemic-express').server

module.exports = new System()
    .add('app', app()).dependsOn('config', 'logger')
    .add('middleware.default', defaultMiddleware()).dependsOn('logger', 'app', 'routes')
    .add('server', server()).dependsOn('config', 'app')
