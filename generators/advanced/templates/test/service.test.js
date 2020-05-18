const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');
const sleepModule = require('./helpers/sleep');

describe('Service Tests', () => {
	let request;
	let busComponent;
	const sys = system();

	before(async () => {
		const { app, bus } = await sys.start();
		request = supertest(app);
		busComponent = bus;
	});

	after(() => sys.stop());

	it('returns manifest', () => request
		.get('/__/manifest')
		.expect(200)
		.then(response => {
			expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
		}));

	it('fails retrieving a message with a 404 not found', async () => {
		const responseV1 = await request.get(`/v1/message/1`);
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
});
