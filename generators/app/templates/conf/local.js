module.exports = {
<% if (components.indexOf('mongo') > -1) { %>
    mongodb: {
        url: 'mongodb://127.0.0.1/example',
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
<% if (components.indexOf('redis') > -1) { %>
    redis: {
        url: 'redis://localhost:6379/1'
    },
<% } %>
<% if (components.indexOf('postgres') > -1) { %>
    postgres: {
        database: 'postgres',
        user: 'postgres'
    },
<% } %>
<% if (components.indexOf('basics') > -1) { %>
    logger: {
        transport: 'console'
    }
<% } %>
}
