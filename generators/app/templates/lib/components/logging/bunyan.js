const bunyan = require('bunyan')
const _ = require('lodash')

module.exports = function() {

    let log

    function start({ pkg }, cb) {
        log = bunyan.createLogger({ name: pkg.name })
        return cb(null, onMessage)
    }

    function onMessage(event) {
        log[event.level](_.omit(event, ['level', 'message']), event.message)
    }

    return {
        start: start
    }
}
