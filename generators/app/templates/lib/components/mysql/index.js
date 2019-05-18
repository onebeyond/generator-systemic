const System = require('systemic');
const mysql = require('systemic-mysql');

module.exports = new System()
    .add('mysql', mysql()).dependsOn('config', 'logger');
