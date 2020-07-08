const System = require('systemic');
const adminRoutes = require('./admin-routes');
<%_ if (showcase) { -%>
const apiRoutesV1 = require('./v1/api-routes');
const apiRoutesV2 = require('./v2/api-routes');
<%_ } -%>

module.exports = new System({ name: 'routes' })
	.add('routes.admin', adminRoutes())
	.dependsOn('config', 'logger', 'app', 'middleware.prepper', 'manifest')
	<%_ if (showcase) { -%>
	.add('routes.api.v1', apiRoutesV1())
	.dependsOn('app', 'logger',
		{
			component: 'controller',
			source: 'controller.api.v1',
		})
	.add('routes.api.v2', apiRoutesV2())
	.dependsOn('app', 'logger',
		{
			component: 'controller',
			source: 'controller.api.v2',
		})
	.add('routes')
	.dependsOn('routes.admin', 'routes.api.v1', 'routes.api.v2');
	<%_ } else { -%>
	.add('routes')
	.dependsOn('routes.admin');
	<%_ } -%>
