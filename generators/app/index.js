
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');


const templatesFolder = path.join(__dirname, 'templates');

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
		},
		{
			type: 'confirm',
			name: 'extraComponents',
			message: 'Would you like to have a showcase including extra components?',
			default: false,
		}];

		return this.prompt(prompts).then(props => {
			this.props = props;
			this.props.components = ['app', 'config', 'logging', 'express', 'routes'];
			if (this.props.extraComponents) {
				this.props.components = [...this.props.components, 'bus', 'store', 'controller'];
			}
		});
	}

	writing() {
		const extraComponentsFiles = ['_docker-compose.yml'];

		const copyFiles = (from, to) => {
			const configFiles = fs.readdirSync(path.join(templatesFolder, from));
			configFiles.forEach(file => {
				if (!this.props.extraComponents && extraComponentsFiles.includes(file)) return;
				this.fs.copyTpl(this.templatePath(`./${from}/${file}`), this.destinationPath(`${to}/${file.replace(/^_/, '')}`), this.props);
			});
		};

		const copyAppFiles = () => {
			// tests
			this.fs.copy(this.templatePath('./test/.eslintrc'), this.destinationPath('./test/.eslintrc'));
			this.fs.copyTpl(this.templatePath('./test/*'), this.destinationPath('./test/'), this.props);
			if (this.props.extraComponents) {
				this.fs.copy(this.templatePath('./test/helpers/*'), this.destinationPath('./test/helpers/'));
			}

			// components
			this.props.components.forEach(component => {
				this.fs.copyTpl(this.templatePath(`./lib/components/${component}/*`), this.destinationPath(`./components/${component}/`), this.props);
			});
			if (this.props.extraComponents) {
				this.fs.copyTpl(this.templatePath('./lib/components/routes/v1/*'), this.destinationPath('./components/routes/v1/'), this.props);
				this.fs.copyTpl(this.templatePath('./lib/components/routes/v2/*'), this.destinationPath('./components/routes/v2/'), this.props);
				this.fs.copyTpl(this.templatePath('./lib/components/controller/'), this.destinationPath('./components/controller/'), this.props);
			}
		};

		copyFiles('docs', 'docs');
		copyFiles('config', 'config');
		copyFiles('root', '.');
		copyAppFiles();
	}

	install() {
		this.installDependencies({ npm: true, bower: false });
	}

	end() {
		const outputMsg = `\n\nYour service ${this.props.name} has been created.\nnpm run start - start your systemic service`;
		this.log(yosay(outputMsg));
	}
};
