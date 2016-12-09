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

    it('should pass', (done) => {
        done();
    })
})
