const pick = require('lodash.pick')
const onHeaders = require('on-headers')

module.exports = function(options = {}) {

    const prepper = options.prepper || require('prepper')
    const handlers = prepper.handlers

    function start({ app }, cb) {
        app.use((req, res, next) => {

            const logger = req.app.locals.logger.child({ handlers: [
                new handlers.Tracer(),
                new handlers.Merge(pick(req, ['url', 'method', 'headers', 'params']), { key: 'request' })
            ]})

            onHeaders(res, () => {
                const response = { response: { statusCode: res.statusCode, headers: res.headers } }
                if (res.statusCode === 400) logger.error(req.url, response)
                if (res.statusCode < 500) logger.info(req.url, response)
                else logger.error(req.url, response)
            })

            res.locals.logger = logger

            next()
        })

        cb()
    }

    return {
        start: start
    }
}
