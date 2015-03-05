"use strict";

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require('./ddns-proxy/config');
var log = require('./ddns-proxy/logging');

var startProxyServer = function(cfg) {
	log.info('starting proxy server on port ' + cfg.http.port);

	var normalizedPaths = _({
		auth_file: cfg.http.auth.file,
		ssl_pkey: cfg.http.ssl.pkey_path,
		ssl_cert: cfg.http.ssl.cert_path
	}).mapValues(path.normalize);

	// TODO: Implement IETF standard
};

// Load the config, which will trigger 
// loading of the server.
var ddnsConfig = new config.Config()
	.on('loaded', startProxyServer);
ddnsConfig.loadConfig(null, { watch: true });

