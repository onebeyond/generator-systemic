
const yeoman = require('yeoman-generator');
const _ = require('lodash');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');

const templatesFolder = path.join(__dirname, 'templates');

module.exports = yeoman.Base.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your service name',
      default : this.appname
    },
    {
      type    : 'input',
      name    : 'description',
      message : 'A brief description',
      default : ''
    },
    {
      type    : 'checkbox',
      name    : 'components',
      message : 'Choose your components',
      choices: [
        { name: 'mongo'},
        { name: 'redis'},
        { name: 'postgres'},
        { name: 'mysql'}
      ]
    }]).then(function (_answers) {
      this.props = _answers;
      this.props.components.push('app', 'config', 'logging', 'express', 'routes');
      this.props.dockerDependencies = _.size(_.intersection([ 'postgres', 'redis', 'mongo', 'mysql' ], this.props.components)) > 0;
    }.bind(this));
  },
  writing: {
    config: function() {
      this._copyFiles('config', 'config');
      this._copyFiles('bin', 'bin');
      this._copyFiles('root', '.');
      this._copyDockerFiles();
    },
    app: function() {
      this._copyAppFiles();
    }
  },
  install: function() {
    return this.installDependencies({ npm: true, bower: false });
  },
  end: function() {
    var outputMsg = `\n\nYour service ${this.props.name} has been created.\nnpm run start - start your systemic service`;
    if (this.props.dockerDependencies) outputMsg += '\nnpm run docker - initialise the required docker containers';
    this.log(yosay(outputMsg));
  },
  _copyDockerFiles: function() {
    this.fs.copyTpl(this.templatePath('./docker/docker-compose-build.yml'), this.destinationPath('./docker/docker-compose-build.yml'), this.props);
    this.fs.copyTpl(this.templatePath('./docker/supervisor.conf'), this.destinationPath('./docker/supervisor.conf'), this.props);
    if (this.props.dockerDependencies) {
      this.fs.copyTpl(this.templatePath('./docker/docker-compose-local.yml'), this.destinationPath('./docker/docker-compose-local.yml'), this.props);
    }
  },
  _copyFiles: function(from, to) {
    const configFiles = fs.readdirSync(path.join(templatesFolder, from));
    const self = this;
    _.forEach(configFiles, function(file) {
      self.fs.copyTpl(self.templatePath(`./${from}/${file}`), self.destinationPath(`${to}/${file.replace(/^_/, '')}`), self.props);
    });
  },
  _copyAppFiles: function() {
    const self = this;
    this.fs.copy(this.templatePath('./test/.eslintrc'), this.destinationPath('./test/.eslintrc'));
    this.fs.copy(this.templatePath('./test/*'), this.destinationPath('./test/'));
    _.forEach(this.props.components, function(component) {
      self.fs.copy(self.templatePath(`./lib/components/${component}/*`), self.destinationPath(`./components/${component}/`));
    });
  }
});
