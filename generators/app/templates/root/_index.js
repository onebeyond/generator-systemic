const runner = require('systemic-domain-runner')
const bunyan = require('bunyan')
const system = require('./lib/system')
const init = require('./lib/init')
const name = require('./package.json').name
const emergencyLogger = bunyan.createLogger({ name: name })

process.env.SERVICE_ENV = process.env.SERVICE_ENV || 'local'

runner(system, { logger: emergencyLogger }).start((err, components) => {
    if (err) die('Error starting system', err)
    init(components)
    process.on('confabulous_reload_error', err => logger.error('Error reloading config', err))
})

function die(message, err) {
    emergencyLogger.error(err, message)
    process.exit(1)
}
