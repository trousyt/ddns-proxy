"use strict";

var fs = require('fs');
var httpAuth = require('http-auth');
var httpProxy = require('node-http-proxy');
var ddnsConfig = require('./config');

var startProxyServer = function(cfg) {
	
	var proxyOptions = {}
	if (cfg.http.ssl.use_ssl) {
		proxyOptions.secure = true;
		proxyOptions.ssl = {
			key: fs.readFileSync(config.cfg.http.ssl.pkey, 'utf8'),
			cert: fs.readFileSync(config.cfg.http.ssl.cert, 'utf8')
		};
	}

	// Setup auth.
	var basicAuth = httpAuth.basic({
		realm: cfg.http.auth.realm,
		file: cfg.http.auth.file // May need to use __filePath to replace './'	
	});

	// Start the server..
	var proxy = httpProxy.createProxyServer(proxyOptions);
	proxy.listen(8800);

	var options = {
		key: fs.readFileSync(cfg.http.ssl.pkey_path),
		cert: fs.readFileSync(cfg.http.ssl.cert_path)
	};

	http.createServer(options, function(req, res) {
		// TODO: Proxy new
		// TODO: Proxy update
	});
};

// Load the config, which will cause loading of the server.
var config = new ddnsConfig.Config();
config.on('loaded', function(cfg) {
	startProxyServer(cfg);
});