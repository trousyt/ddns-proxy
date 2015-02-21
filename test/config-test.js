var assert = require('assert');
var config = require('../config');

describe('Config', function() {

	var ddnsConfig = null;

	beforeEach(function() {
		ddnsConfig = new config.Config();
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

			ddnsConfig.loadConfig('./config-test.json');

		});	
	});
});