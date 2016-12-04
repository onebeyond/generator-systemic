console.log('Hello world')
// const system = require('./lib/system')
// const runner = require('systemic-domain-runner')
// const transports = require('./lib/system/transports')
// const pkg = require('./package')

// process.env.SERVICE_ENV = process.env.SERVICE_ENV || 'local'

// runner(system).start((err, components) => {
//     if (err) die('Error starting system', err)
//     process.on('confabulous_reload_error', (err) => components.logger.error('Error reloading config', err))
// })

// function die(message, err) {
//     const event = {
//         timestamp: new Date().toISOString(),
//         level: 'error',
//         message: message,
//         service: {
//             name: pkg.name,
//             env: process.env['SERVICE_ENV']
//         },
//         error: {
//             message: err.message,
//             stack: err.stack,
//             code: err.code
//         }
//     }
//     transports[process.env.LOGGER_TRANSPORT || 'console'](event)
//     process.exit(1)
// }
