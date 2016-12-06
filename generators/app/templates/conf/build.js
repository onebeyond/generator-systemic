module.exports = {
<% if (setup.indexOf('mongo') > -1) { %>
    mongodb: {
        url: 'mongodb://mongo/example-test',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 5000,
                    socketTimeoutMS: 5000
                }
            }
        }
    },
<% } %>
<% if (setup.indexOf('redis') > -1) { %>
    redis: {
        url: 'redis://redis/2'
    },
<% } %>
<% if (setup.indexOf('postgres') > -1) { %>
    postgres: {
        host: 'postgres',
        database: 'postgres',
        user: 'postgres'
    },
<% } %>
<% if (setup.indexOf('basics') > -1) { %>
    logger: {
        transport: 'console'
    }
<% } %>
}
