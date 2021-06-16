const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');
<%_ if (showcase) { -%>
const sleepModule = require('./helpers/sleep');
const storeHelper = require('./helpers/store');
<%_ } -%>

describe('Service Tests', () => {
  let request;
  <%_ if (showcase) { -%>
  let busComponent;
  <%_ } -%>
  const sys = system();

  before(async () => {
    const { app<% if (showcase) { %>, bus, config, mongodb<% } %> } = await sys.start();
    request = supertest(app);
    <%_ if (showcase) { -%>
    busComponent = bus;
    await storeHelper.start({ mongodb, config: config.store });
    <%_ } -%>
  });

  <%_ if (!showcase) { -%>
  after(() => sys.stop());
  <%_ } -%>
  <%_ if (showcase) { -%>
  after(async () => {
    await storeHelper.emptyCollection();
    await sys.stop();
  });
  <%_ } -%>

  it('returns manifest', () => (
    request
      .get('/__/manifest')
      .expect(200)
      .then(response => {
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
        expect(response.headers['x-frame-options']).to.equal('SAMEORIGIN');
        expect(response.headers['x-download-options']).to.equal('noopen');
        expect(response.headers['x-dns-prefetch-control']).to.equal('off');
        expect(response.headers['x-content-type-options']).to.equal('nosniff');
        expect(response.headers['strict-transport-security']).to.equal('max-age=15552000; includeSubDomains');
      })));
  <%_ if (showcase) { -%>

  it('fails retrieving a message with a 404 not found', async () => {
    const responseV1 = await request.get('/v1/message/1');
    expect(responseV1.body.message).to.equal('Not found request error');
    expect(responseV1.body.extra).to.equal('A message with the given id was not found');
  });

  it('checks the whole integration chain', async () => {
    // publish message into bus
    const message = { id: '1', text: 'Hello World!' };
    await busComponent.publish('demo_exchange', message, 'some.routing.key');

    // wait for the message to be received and stored
    await sleepModule.sleep(1000);

    // check V1 endpoint response
    const responseV1 = await request.get(`/v1/message/${message.id}`);
    expect(responseV1.body.id).to.equal('1');
    expect(responseV1.body.text).to.equal('hello world!');

    // check V2 endpoint response
    const responseV2 = await request.get(`/v2/message/${message.id}`);
    expect(responseV2.body.id).to.equal('1');
    expect(responseV2.body.text).to.equal('HELLO WORLD!');
    expect(responseV2.body.receptionTimestamp).not.to.be(undefined);
  });
  <%_ } -%>
});
