const _ = require('lodash');
const requireAll = require('require-all');
const componentsAssertions = requireAll(__dirname);

module.exports = function(section, components) {
  _.forEach(components, function(component) {
    (componentsAssertions[component][section] || _.noop)();
  });
};
