module.exports = function(options = {}) {

    function start({ manifest = {}, app }, cb) {
        app.get('/__/manifest', (req, res) => res.json(manifest))
        cb()
    }

    return {
        start: start
    }
}
