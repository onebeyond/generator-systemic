const merge = require('lodash.merge')
const get = require('lodash.get')

module.exports = function(options = {}) {

    const prepper = options.prepper || require('prepper')
    const handlers = prepper.handlers

    function start({ config, transports, pkg = { name: 'unknown' } }, cb) {
        const transport = options.transport !== undefined ? options.transport : get(transports, config.transport)
        config = merge({ include: [], exclude: [] }, config)

        const logger = new prepper.Logger({ handlers: [
            new handlers.Merge({ package: pkg }),
            new handlers.Merge({ service: { env: process.env.SERVICE_ENV } }),
            new handlers.Process(),
            new handlers.System(),
            new handlers.Timestamp(),
            new handlers.Flatten(),
            new handlers.KeyFilter({ include: config.include, exclude: config.exclude }),
            new handlers.Unflatten()
        ]}).on('message', event => {
            if (transport) transport(event)
        })

        cb(null, logger)
    }

    return {
        start: start
    }
}
