const assert = require('yeoman-assert');

module.exports = {
  configuration: function() {
    assert.file([ 'conf/default.js', 'conf/local.js', 'conf/live.js', 'conf/test.js', 'conf/build.js' ]);
  },
  lib: function() {
    assert.file([ 'lib/components/config/confabulous.js', 'lib/components/config/index.js' ]);
    assert.file([ 'lib/components/config/confabulous.js', 'lib/components/config/index.js' ]);
  }
}
