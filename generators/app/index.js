'use strict';
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
        { name: 'logging'},
        { name: 'express'},
        { name: 'mongo'},
        { name: 'redis'},
        { name: 'postgres'}
      ]
    }]).then(function (_answers) {
      this.props = _answers;
      this.props.components.push('basics');
    }.bind(this));
  },
  writing: {
    config: function() {
      this._copyFiles('conf', 'conf');
      this._copyFiles('bin', 'bin');
      this._copyFiles('docker', 'docker');
      this._copyFiles('root', '.');
    },
    app: function() {
      this._copyAppFiles();
    }
  },
  install: function() {
    this.installDependencies();
  },
  end: function() {
    this.log(yosay(`\n\nYour service ${this.props.name} has been created.
              npm run docker - initialise the required docker containers
              npm run start - start your systemic service`));
  },
  _copyFiles: function(from, to) {
    const configFiles = fs.readdirSync(path.join(templatesFolder, from));
    const self = this;
    _.forEach(configFiles, function(file) {
      self.fs.copyTpl(self.templatePath(`./${from}/${file}`), self.destinationPath(to + '/' + file.replace(/^_/, '')), self.props);
    });
  },
  _copyAppFiles: function() {
    const self = this;
    this.fs.copy(this.templatePath('./lib/system.js'), this.destinationPath('./lib/system.js'));
    if (_.includes(this.props.components, 'routes')) this.fs.copy(this.templatePath('./test/*'), this.destinationPath('./test/'));
    _.forEach(this.props.components, function(component) {
      self.fs.copy(self.templatePath(`./lib/components/${component}/*`), self.destinationPath(`./lib/components/${component}/`));
    });
  }
});
