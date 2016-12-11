
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('Systemic service generator', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'test-service', description: 'some description', components: []})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'index.js'
    ]);
  });
});
