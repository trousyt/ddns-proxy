"use strict";

var fs = require('fs');
var util = require('util');
var path = require('path');
var events = require('events');
var log = require('./logging');

/**
 * Handles configuration loading.
 */
var Config = function() {
	events.EventEmitter.call(this);

	this.defaults = {
		'path': 'config.json',
		'http.port': 8800,
		'http.auth.realm': 'ddns-proxy',
		'http.auth.file': 'users.htpasswd',
		'http.ssl.use_ssl': false,
		'http.ssl.cert_path': 'cert.pem',
		'http.ssl.pkey_path': 'pkey.pem'
	};

	return this;
};

util.inherits(Config, events.EventEmitter);

/**
 * Fixes up a path by using the default path if
 * one isn't explicitly specified and normalizing it.
 *
 * @param {string} p The path to the config file
 */
Config.prototype.fixupPath = function(p) {
	p = p || this.defaults['path'];
	p = path.normalize(p);
	return p;
};

/**
 * Sets the default values after a load if values aren't 
 * specified in the config file.
 *
 * @param {object} cfg Config object
 * @return {object} Config object with defaults set
 */
Config.prototype.setDefaults = function(cfg) {

	cfg = cfg || {};
	cfg.http = cfg.http || {};
	cfg.http.auth = cfg.http.auth || {};
	cfg.http.ssl = cfg.http.ssl || {};

	var defaults = this.defaults;
	cfg.http.port = cfg.http.port || defaults['http.port'];
	cfg.http.auth.realm = cfg.http.auth.realm || defaults['http.auth.realm'];
	cfg.http.auth.file = cfg.http.auth.file || defaults['http.auth.file'];
	cfg.http.ssl.use_ssl = cfg.http.ssl.use_ssl || defaults['http.ssl.use_ssl'];
	cfg.http.ssl.cert_path = cfg.http.ssl.cert_path || defaults['http.ssl.cert_path'];
	cfg.http.ssl.pkey_path = cfg.http.ssl.pkey_path || defaults['http.ssl.pkey_path'];
	return cfg;
};

/**
 * Initiates load of the config file.
 *
 * @param {string} fromPath Path to config
 * @param {Object} options Options for the call.
 */
Config.prototype.loadConfig = function(fromPath, options) {
	
	var that = this;
	fromPath = fromPath || this.defaults['path'];
	fromPath = this.fixupPath(fromPath);
	log.info('starting read of config from ' + fromPath);

	fs.readFile(fromPath, function(err, contents) {
		if (err) throw err;

		//logging.info('read config from disk');
		var cfg = JSON.parse(contents);
		that.cfg = that.setDefaults(cfg);
		that.emit('loaded', cfg);

		if (options.watch) {
			that.watchConfig(fromPath);
		}
	});
};

/**
 * Watches the config file for any changes.
 *
 * @param {string} fromPath Path to config
 */
Config.prototype.watchConfig = function(fromPath) {

	var that = this;
	fromPath = this.fixupPath(fromPath);

	fs.watchFile(fromPath, function(cur, prev) {
		if (cur.mtime !== prev.mtime) {
			//logging.info('config file has changed');
			that.loadConfig(fromPath);
		}
	});
};

exports.Config = Config;
