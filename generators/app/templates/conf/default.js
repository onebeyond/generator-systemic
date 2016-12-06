module.exports = {
<% if (setup.indexOf('express') > -1) { %>
    server: {
        host: '0.0.0.0',
        port: 3000,
        shutdown: {
            delay: '5s'
        }
    },
<% } %>
<% if (setup.indexOf('mongo') > -1) { %>
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
<% } %>
<% if (setup.indexOf('redis') > -1) { %>
    redis: {

    },
<% } %>
<% if (setup.indexOf('postgres') > -1) { %>
    postgres: {

    },
<% } %>
<% if (setup.indexOf('basics') > -1) { %>
    service: {
        reload: {
            window: '60s'
        }
    },
    logger: {
        transport: 'bunyan',
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
<% } %>
}
