module.exports = {
<% if (components.indexOf('mongo') > -1) { %>
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
<% if (components.indexOf('redis') > -1) { %>
    redis: {
        url: 'redis://redis/2'
    },
<% } %>
<% if (components.indexOf('postgres') > -1) { %>
    postgres: {
        host: 'postgres',
        database: 'postgres',
        user: 'postgres'
    },
<% } %>
<% if (components.indexOf('app') > -1) { %>
    logger: {
        transport: null
    }
<% } %>
};
