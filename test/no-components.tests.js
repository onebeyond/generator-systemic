/* eslint-disable no-undef */
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Systemic basic services with no extra components', () => {
	const generateService = (components, next) => {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts({
				name: 'test-service',
				description: 'some description',
				components,
			})
			.on('error', next)
			.on('end', next);
	};

	it('should create a service with proper configuration', done => {
		const targetComponents = [];
		generateService(targetComponents, () => {
			assert.file(['config/default.js', 'config/local.js', 'config/prod.js', 'config/test.js', 'config/build.js']);
			assert.fileContent('config/default.js', /service/);
			assert.fileContent('config/default.js', /transport: 'console'/);
			assert.fileContent('config/default.js', /swaggerValidator/);
			assert.fileContent('config/local.js', /transport: 'console'/);
			assert.noFileContent('config/prod.js', /logger/);
			assert.fileContent('config/test.js', /transport: null/);
			assert.fileContent('config/build.js', /transport: null/);
			done();
		});
	});

	it('should create a service with proper components folder', done => {
		const targetComponents = [];
		generateService(targetComponents, () => {
			assert.file(['components/app/index.js']);
			assert.file(['components/config/confabulous.js', 'components/config/index.js']);
			assert.file(['components/config/confabulous.js', 'components/config/index.js']);
			assert.file(['components/logging/bunyan.js', 'components/logging/console.js', 'components/logging/index.js', 'components/logging/prepper.js']);
			done();
		});
	});

	it('should create a service with basic files', done => {
		const targetComponents = [];
		generateService(targetComponents, () => {
			assert.file(['.dockerignore', '.eslintrc.json', '.gitignore', '.nvmrc', 'Dockerfile', 'index.js', 'package.json', 'README.md', 'system.js', 'makefile']);
			done();
		});
	});
});
