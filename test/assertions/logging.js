const assert = require('yeoman-assert');

module.exports = {
  configuration: function() {
    assert.fileContent('conf/default.js', /transport: \'bunyan\'/);
    assert.fileContent('conf/local.js', /transport: \'console\'/);
    assert.noFileContent('conf/live.js', /logger/);
    assert.fileContent('conf/test.js', /transport: \'console\'/);
    assert.fileContent('conf/build.js', /transport: \'console\'/);
  },
  lib: function() {
    assert.file([ 'lib/components/logging/bunyan.js', 'lib/components/logging/console.js', 'lib/components/logging/index.js', 'lib/components/logging/prepper.js' ]);
  }
}
