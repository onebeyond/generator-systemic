const chalk = require('chalk')
const hogan = require('hogan.js')
const _ = require('lodash')

const response = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{request.method}}} {{{response.statusCode}}} {{{request.url}}}')
const error = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{message}}} {{{code}}}\n{{{error.stack}}} {{{details}}}')
const info = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{message}}} {{{details}}}')

const colours = {
    debug: chalk.gray,
    info: chalk.white,
    warn: chalk.yellow,
    error: chalk.red,
    default: chalk.white
}

module.exports = function() {

    function start(cb) {
        cb(null, onMessage)
    }

    function onMessage(event) {
        const data = _.merge({}, event, {
            displayTracer: _.has(event, 'tracer') ? event.tracer.substr(0, 6) : '------',
            displayLevel: event.level.toUpperCase(),
            details: Object.keys(event).length ? `\n ${JSON.stringify(event, null, 2)}` : ''
        })
        const colour = colours[event.level] || colours.default
        const log = console[event.level] || console.info // eslint-disable-line no-console
        if (_.has(event, 'response.statusCode')) log(colour(response.render(data)))
        else if (_.has(event, 'error.message')) log(colour(error.render(data)))
        else log(colour(info.render(data)))
    }

    return {
        start: start
    }
}

