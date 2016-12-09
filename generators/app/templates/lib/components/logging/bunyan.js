const bunyan = require('bunyan')
const R = require('ramda')

module.exports = function() {

    let log

    function start({ pkg }, cb) {
        log = bunyan.createLogger({ name: pkg.name })
        return cb(null, onMessage)
    }

    function onMessage(event) {
        log[event.level](R.omit(['level', 'message'], event), event.message)
    }

    return {
        start: start
    }
}
