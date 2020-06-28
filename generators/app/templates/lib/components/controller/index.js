const System = require('systemic');
const initControllerBus = require('./bus/initController');
const initControllerApiV1 = require('./api/v1/initController');
const initControllerApiV2 = require('./api/v2/initController');

module.exports = new System({ name: 'controller' })
	.add('controller.bus', initControllerBus())
	.dependsOn('logger', 'bus', 'store')
	.add('controller.api.v1', initControllerApiV1())
	.dependsOn('logger', 'store')
	.add('controller.api.v2', initControllerApiV2())
	.dependsOn('logger', 'store')
	.add('controller')
	.dependsOn('controller.bus', 'controller.api.v1', 'controller.api.v2');
