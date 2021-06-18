const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: '<%= name %>' })
  .bootstrap(join(__dirname, 'components'));
