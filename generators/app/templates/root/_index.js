const system = require('./lib/system')
const runner = require('systemic-domain-runner')
const bunyan = require('bunyan')
const name = require('./package.json').name
const log = bunyan.createLogger({ name: name })

process.env.SERVICE_ENV = process.env.SERVICE_ENV || 'local'

runner(system).start((err, components) => {
    if (err) die('Error starting system', err)
    process.on('confabulous_reload_error', (err) => components.logger.error('Error reloading config', err))
})

function die(message, err) {
    log.error(err, message)
    process.exit(1)
}
