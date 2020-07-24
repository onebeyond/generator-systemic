/* eslint-disable no-param-reassign */

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');


module.exports = class extends Generator {
	prompting() {
		this.log(
			yosay(`Welcome to the unreal ${chalk.red('systemic')} generator!`),
		);

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'Your service name',
			default: this.appname.replace(/\s+/g, '-'),
		},
		{
			type: 'input',
			name: 'description',
			message: 'A brief description',
			default: '',
		},
		{
			type: 'input',
			name: 'author',
			message: 'The service author',
			default: 'author',
		},
		{
			type: 'input',
			name: 'email',
			message: 'The service author contact email',
			default: 'author@domain.com',
		}];

		return this.prompt(prompts).then(props => {
			this.props = props;
			this.props.showcase = !!this.options.showcase;

			this.props.filesToSkip = [
				// test
				'test/unit/sample.test.js',
				'test/mocks/components/config.js',
				'test/mocks/components/logger.js',
				'test/mocks/components/metrics.js',
			];

			if (!this.props.showcase) {
				this.props.filesToSkip = [
					...this.props.filesToSkip,
					// root
					'root/_docker-compose.yml',
					// test
					'test/helpers/sleep.js',
					'test/helpers/store.js',
					// components
					'lib/components/routes/v1/api-routes.js',
					'lib/components/routes/v2/api-routes.js',
					'lib/components/bus/index.js',
					'lib/components/bus/initBus.js',
					'lib/components/store/index.js',
					'lib/components/store/initStore.js',
					'lib/components/controller/index.js',
					'lib/components/controller/bus/initController.js',
					'lib/components/controller/api/v1/initController.js',
					'lib/components/controller/api/v2/initController.js',
				];
			}
		});
	}

	writing() {
		const getFiles = (dirPath, filesPaths = []) => {
			const files = fs.readdirSync(dirPath);

			files.forEach(file => {
				if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
					filesPaths = getFiles(`${dirPath}/${file}`, filesPaths);
				} else {
					filesPaths.push(path.join(dirPath, file));
				}
			});

			return filesPaths;
		};

		const copyFiles = (from, to) => {
			const templatesFolder = path.join(__dirname, 'templates', from);
			const files = getFiles(templatesFolder).map(file => file.split(`${from}/`)[1]);

			files.forEach(file => {
				if (this.props.filesToSkip.includes(`${from}/${file}`)) return;
				this.fs.copyTpl(this.templatePath(`./${from}/${file}`), this.destinationPath(`${to}/${file.replace(/^_/, '')}`), this.props);
			});
		};

		copyFiles('root', '.');
		copyFiles('docs', 'docs');
		copyFiles('config', 'config');
		copyFiles('test', 'test');
		copyFiles('lib/components', 'components');
	}

	install() {
		this.installDependencies({ npm: true, bower: false });
	}

	end() {
		const outputMsg = `\n\nYour service ${this.props.name} has been created.\nnpm run start - start your systemic service`;
		this.log(yosay(outputMsg));
	}
};
