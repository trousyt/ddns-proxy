"use strict";

var path = require('path');
var log4js = require('log4js');

var configPath = './log4js.json';
configPath = path.resolve(configPath);
log4js.configure(configPath);

module.exports = log4js.getLogger();