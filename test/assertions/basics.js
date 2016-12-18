const assert = require('yeoman-assert');

module.exports = {
  configuration: function() {
    assert.fileContent('conf/default.js', /service/);
  },
  build: function() {
    assert.file([ 'bin/build.sh' ]);
    assert.fileContent('bin/build.sh', /docker\-compose \-\-file \.\/docker\/docker\-compose\-build\.yml build/)
  },
  docker: function() {
    assert.file([ 'docker/docker-compose-build.yml' ]);
    assert.fileContent('docker/docker-compose-build.yml', /services:/)
    assert.fileContent('docker/docker-compose-build.yml', /test\-service:/)
  },
  lib: function() {
    assert.file([ '.dockerignore', '.eslintrc', '.gitignore', '.nvmrc', 'Dockerfile', 'index.js', 'package.json', 'README.md' ]);
    assert.file([ 'lib/init.js', 'lib/system.js' ]);
    assert.file([ 'lib/components/basics/index.js' ]);
  },
  test: function() {
    assert.file([ 'test/.eslintrc', 'test/env.js', 'test/example.tests.js', 'test/mocha.opts' ]);
  }
}
