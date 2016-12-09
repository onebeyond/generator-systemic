const path = require('path')

module.exports = function(options = {}) {

    const Confabulous = options.confabulous || require('confabulous')
    const loaders = Confabulous.loaders
    let config

    function start(cb) {
        if (config) return cb(null, config)

        new Confabulous()
            .add(config => loaders.require({ path: path.join(process.cwd(), 'conf', 'default.js'), watch: true }))
            .add(config => loaders.require({ path: path.join(process.cwd(), 'conf', `${process.env.SERVICE_ENV}.js`), watch: true, mandatory: false }))
            .add(config => loaders.require({ path: path.join(process.cwd(), 'etc', 'secrets.json'), watch: true, mandatory: false }))
            .add(config => loaders.args())
            .on('loaded', cb)
            .on('error', cb)
            .on('reloaded', function(_config) {
                config = _config
                process.emit('systemic_restart')
            })
            .on('reload_error', function(err) {
                process.emit('confabulous_reload_error', err)
            })
            .end(cb)
    }

    return {
        start: start
    }

}
