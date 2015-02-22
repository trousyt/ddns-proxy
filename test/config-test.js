"use strict";

var fs = require('fs');
var assert = require('assert');
var config = require('../lib/config');

describe('Config', function() {

	var ddnsConfig = null;
	var testPath = __dirname + '/config-test.json';

	var createTestConfig = function() {
		fs.writeFileSync(testPath, '{}');
	};

	beforeEach(function() {
		ddnsConfig = new config.Config();
		createTestConfig(testPath);
	});

	afterEach(function() {
		if (fs.existsSync(testPath)) {
			fs.unlink(testPath);
		}
	});

	describe('#fixupPath()', function() {

		it('should use the default config path if one is not specified', function() {
			var result = ddnsConfig.fixupPath(testPath);
			assert(result);
		});	

		it('should return an absolute path', function() {
			var result = ddnsConfig.fixupPath(testPath);
			assert(result.indexOf('.') > 0, 'path is not absolute');
		});

	});


	describe('#setDefaults()', function() {
		it('should set defaults when a config value is not present', function() {

			var defaults = ddnsConfig.defaults;
			var result = ddnsConfig.setDefaults({});

			assert.equal(result.http.port, defaults['http.port']);
			assert.equal(result.http.auth.realm, defaults['http.auth.realm']);
			assert.equal(result.http.auth.file, defaults['http.auth.file']);
			assert.equal(result.http.ssl.use_ssl, defaults['http.ssl.use_ssl']);
			assert.equal(result.http.ssl.cert_path, defaults['http.ssl.cert_path']);
			assert.equal(result.http.ssl.pkey_path, defaults['http.ssl.pkey_path']);

		});
	});

	describe('#loadConfig()', function() {

		it('should load the config file', function(done) {
			ddnsConfig.on('loaded', function(cfg) {
				assert.notEqual(cfg, undefined);
				done();
			});

			ddnsConfig.loadConfig(testPath);
		});	

		it.skip('should watch the config file for changes', function(done) {
			ddnsConfig.on('loaded', function() {
				done();
			});

			ddnsConfig.watchConfig(testPath);
			fs.writeFile(testPath, '{http:{}}');
		});

	});
});