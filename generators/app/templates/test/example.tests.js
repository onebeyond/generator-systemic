const assert = require('chai').assert
const system = require('../lib/system')
const request = require('request')

describe('Example Tests', () => {

    let components

    before((done) => {
        system.start((err, _components) => {
            if (err) return done(err)
            components = _components
            done()
        })
    })

    after((done) => {
        system.stop(done)
    })

    it('should return manifest', (done) => {
        request({ url: `http://${components.config.server.host}:${components.config.server.port}/__/manifest`, json: true }, (err, res, body) => {
            assert.ifError(err)
            assert.equal(res.statusCode, 200)
            assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')
            done()
        })
    })
})
