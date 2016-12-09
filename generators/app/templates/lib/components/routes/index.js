const _ = require('lodash')
const System = require('systemic')
const prepperMiddleware = require('./prepper-middleware')
const adminRoutes = require('./admin-routes')
const apiRoutes = require('./api-routes')

const apiDependencies = [ 'app' ];
<% const addedComponents = _.intersection([ 'mongo', 'postgres', 'redis' ], components);
if (_.size(addedComponents) > 0)%>apiDependencies = apiDependencies.concat(<% addedComponents.join(',')) %>

module.exports = new System()
    .add('middleware.prepper', prepperMiddleware()).dependsOn('app')
    .add('routes.admin', adminRoutes()).dependsOn('app', 'middleware.prepper', 'manifest')
    .add('routes.api', apiRoutes()).dependsOn(...apiDependencies)
    .add('routes').dependsOn('routes.admin', 'routes.api')
