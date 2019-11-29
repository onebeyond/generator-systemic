
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
		}];

		return this.prompt(prompts).then(props => {
			this.props = props;
			this.props.components = ['app', 'config', 'logging', 'express', 'routes'];
		});
	}

	writing() {
		const copyFiles = (from, to) => {
			const configFiles = fs.readdirSync(path.join(templatesFolder, from));
			configFiles.forEach(file => {
				this.fs.copyTpl(this.templatePath(`./${from}/${file}`), this.destinationPath(`${to}/${file.replace(/^_/, '')}`), this.props);
			});
		};

		const copyAppFiles = () => {
			this.fs.copy(this.templatePath('./test/.eslintrc'), this.destinationPath('./test/.eslintrc'));
			this.fs.copy(this.templatePath('./test/*'), this.destinationPath('./test/'));
			this.props.components.forEach(component => {
				this.fs.copy(this.templatePath(`./lib/components/${component}/*`), this.destinationPath(`./components/${component}/`));
			});
		};

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
