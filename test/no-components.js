var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('Systemic service with no components chosen', function () {

  const basicComponents = [ 'basics', 'config', 'logging' ];

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test-service',
        description: 'some description',
        components: basicComponents
      }).toPromise();
  });

  it('creates configuration files', function () {
    assert.file([ 'conf/default.js', 'conf/local.js', 'conf/live.js', 'conf/test.js', 'conf/build.js' ]);
    assert.fileContent('conf/default.js', /service/);
    assert.fileContent('conf/default.js', /transport: \'bunyan\'/);
    assert.fileContent('conf/local.js', /transport: \'console\'/);
    assert.noFileContent('conf/live.js', /logger/);
    assert.fileContent('conf/test.js', /transport: \'console\'/);
    assert.fileContent('conf/build.js', /transport: \'console\'/);
  });

  it('creates build file', function () {
    assert.file([ 'bin/build.sh' ]);
    assert.fileContent('bin/build.sh', /docker\-compose \-\-file \.\/docker\/docker\-compose\-build\.yml build/)
  });

  it('creates docker compose files', function () {
    assert.file([ 'docker/docker-compose-build.yml' ]);
    assert.fileContent('docker/docker-compose-build.yml', /services:/)
    assert.fileContent('docker/docker-compose-build.yml', /test\-service:/)
  });

  it('creates lib files', function () {
    assert.file([ 'lib/init.js', 'lib/system.js' ]);
    assert.file([ 'lib/components/basics/index.js' ]);
    assert.file([ 'lib/components/config/confabulous.js', 'lib/components/config/index.js' ]);
    assert.file([ 'lib/components/config/confabulous.js', 'lib/components/config/index.js' ]);
    assert.file([ 'lib/components/logging/bunyan.js', 'lib/components/logging/console.js', 'lib/components/logging/index.js', 'lib/components/logging/prepper.js' ]);
  });

  it('creates test files', function () {
    assert.file([ 'test/.eslintrc', 'test/env.js', 'test/example.tests.js', 'test/mocha.opts' ]);
  });

});
