'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
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
      name    : 'setup',
      message : 'Choose your components',
      choices: [
        { name: 'express'},
        { name: 'mongo'},
        { name: 'redis'},
        { name: 'postgres'}
      ]
    }]).then(function (_answers) {
      this.props = _answers;
      this.props.setup.push('basics');
    }.bind(this));
  },
  writing: {
    config: function() {
      this._copyFiles('conf', 'conf');
      this._copyFiles('bin', 'bin');
      this._copyFiles('root', '.');
    },
    app: function() {

    }
  },
  install: function() {
    this.installDependencies();
  },
  _copyFiles: function(from, to) {
    const configFiles = fs.readdirSync(path.join(templatesFolder, from));
    const self = this;
    _.forEach(configFiles, function(file) {
      self.fs.copyTpl( self.templatePath(`./${from}/${file}`), self.destinationPath(to + '/' + file.replace(/^_/, '')), self.props );
    });
  }
});

// The available priorities are (in running order):

// initializing - Your initialization methods (checking current project state, getting configs, etc)
// prompting - Where you prompt users for options (where you'd call this.prompt())
// configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
// default - If the method name doesn't match a priority, it will be pushed to this group.
// writing - Where you write the generator specific files (routes, controllers, etc)
// conflicts - Where conflicts are handled (used internally)
// install - Where installation are run (npm, bower)
// end - Called last, cleanup, say good bye, etc

