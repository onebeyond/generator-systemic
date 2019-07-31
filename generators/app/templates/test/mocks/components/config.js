const { join } = require('path');
const defaultConfig = require(join(process.cwd(), 'config', 'default'));

module.exports = () => (defaultConfig);
