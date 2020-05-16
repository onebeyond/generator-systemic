module.exports = {
	rabbitmq: {
		defaults: {},
		vhosts: {
			vhost_name: {
				connection: {
					hostname: '127.0.0.1',
					user: 'rabbitmq',
					password: 'rabbitmq',
				},
				exchanges: [
					'demo_exchange',
				],
				queues: [
					'demo_queue',
				],
				bindings: [
					'demo_exchange[some.routing.key] -> demo_queue',
				],
				subscriptions: {
					demo_subscription: {
						queue: 'demo_queue',
					},
				},
				publications: {
					demo_publication: {
						exchange: 'demo_exchange',
						routingKey: 'some.routing.key',
					},
				},
			},
		},
	},
	logger: { transport: null },
};
