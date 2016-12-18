const _ = require('lodash');
const path = require('path');
const helpers = require('yeoman-test');
const assertions = require('./assertions');

describe('Systemic service', function () {

  const serviceSections = [ 'configuration', 'build', 'docker', 'lib', 'test' ];

  var generateService = function(components, next) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test-service',
        description: 'some description',
        components: components
      })
      .on('error', next)
      .on('end', next);
  };

  it('should create a service with no components chosen apart from the basic ones', function (done) {
    const targetComponents = [ ];
    generateService(targetComponents, function() {
      _.forEach(serviceSections, function(section) { assertions(section, targetComponents); });
      done();
    });
  });

});
