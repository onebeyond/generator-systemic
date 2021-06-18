module.exports = {
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
  routes: {
    admin: {
      openAPIOptions: {
        info: {
          version: '1.0.0',
          title: 'OpenAPI <%= name %>',
          license: {
            name: 'MIT',
          },
          contact: {
            name: '<%= name %> API Support',
            email: '<%= email %>',
          },
        },
        security: {
          BasicAuth: {
            type: 'http',
            scheme: 'basic',
          },
        },
        baseDir: process.cwd(),
        filesPattern: './**/*.js',
      },
    },
  },
  <%_ if (showcase) { -%>
  mongodb: {
    url: 'mongodb://localhost:27017/',
    options: {
      poolSize: 5,
      useUnifiedTopology: true,
    },
  },
  store: {
    databaseName: 'mongodb',
    collectionName: 'messages',
  },
  rabbitmq: {
    defaults: {},
    vhosts: {
      vhost_name: {
        connection: {
          hostname: '127.0.0.1',
          user: 'rabbitmq',
          password: 'rabbitmq',
        },
        exchanges: [],
        queues: [
          'demo_queue',
        ],
        bindings: [],
        subscriptions: {
          demo_subscription: {
            queue: 'demo_queue',
          },
        },
        publications: {},
      },
    },
  },
  <%_ } -%>
  logger: {
    transport: 'console',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'service',
    ],
    exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
  },
};
