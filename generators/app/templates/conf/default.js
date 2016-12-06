module.exports = {
    service: {
        reload: {
            window: '60s'
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        shutdown: {
            delay: '5s'
        }
    },
    mongodb: {
        options: {
            db: {
                readPreference: 'secondaryPreferred',
                maxTimeMS: 30000
            },
            server: {
                poolSize: 5,
                autoReconnect: true,
                reconnectTries: 30,
                reconnectInterval: 1000,
                socketOptions: {
                    keepAlive: 5000,
                    connectTimeoutMS: 10000,
                    socketTimeoutMS: 30000,
                    noDelay: true
                }
            }
        }
    },
    redis: {
    },
    postgres: {
    },
    logger: {
        transport: 'json',
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
            'mongo',
            'service'
        ],
        exclude: [
            'password',
            'secret',
            'token',
            'request.headers.cookie',
            'dependencies',
            'devDependencies'
        ]
    }
}
