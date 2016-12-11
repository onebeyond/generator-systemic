const system = require('../lib/system')

describe('Example Tests', () => {

    before((done) => {
        system.start(done)
    })

    after((done) => {
        system.stop(done)
    })

    it('should pass', (done) => {
        done()
    })
})
