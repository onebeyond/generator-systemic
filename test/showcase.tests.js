const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Systemic showcase service with extra components', () => {
  const generateService = next => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ showcase: true })
      .withPrompts({
        name: 'test-service',
        description: 'some description',
        author: 'john doe',
        email: 'john.doe@dead.com',
      })
      .on('error', next)
      .on('end', next);
  };

  it('should create a service with proper configuration', done => {
    generateService(() => {
      assert.file(['config/default.js', 'config/local.js', 'config/prod.js', 'config/test.js', 'config/build.js']);
      assert.fileContent('config/default.js', /service/);
      assert.fileContent('config/default.js', /transport: 'console'/);
      assert.fileContent('config/default.js', /openAPIOptions/);
      assert.fileContent('config/default.js', /mongodb/);
      assert.fileContent('config/default.js', /store/);
      assert.fileContent('config/default.js', /rabbitmq/);
      assert.fileContent('config/local.js', /transport: 'console'/);
      assert.noFileContent('config/prod.js', /logger/);
      assert.fileContent('config/test.js', /transport: null/);
      assert.fileContent('config/test.js', /rabbitmq/);
      assert.fileContent('config/build.js', /transport: null/);
      done();
    });
  });

  it('should create a service with proper components folder', done => {
    generateService(() => {
      assert.file(['components/app/index.js']);
      assert.file(['components/config/confabulous.js', 'components/config/index.js']);
      assert.file(['components/logging/bunyan.js', 'components/logging/console.js', 'components/logging/index.js', 'components/logging/prepper.js']);
      assert.file(['components/store/index.js', 'components/store/initStore.js']);
      assert.file(['components/bus/index.js', 'components/bus/initBus.js']);
      assert.file(['components/routes/index.js', 'components/routes/admin-routes.js', 'components/routes/v1/api-routes.js', 'components/routes/v2/api-routes.js']);
      assert.file(['components/controller/index.js', 'components/controller/bus/initController.js', 'components/controller/api/v1/initController.js', 'components/controller/api/v2/initController.js']);
      done();
    });
  });

  it('should create a service with files', done => {
    generateService(() => {
      assert.file(['.dockerignore', '.eslintrc.json', '.gitignore', '.nvmrc', 'Dockerfile', 'index.js', 'package.json', 'README.md', 'system.js', 'makefile', 'docker-compose.yml']);
      done();
    });
  });
});
