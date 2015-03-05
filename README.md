# ddns-proxy
A HTTP proxy that proxies [IETF RFC-2136](http://tools.ietf.org/html/rfc2136) requests.

[![Build Status](https://travis-ci.org/trousyt/ddns-proxy.svg)](https://travis-ci.org/trousyt/ddns-proxy)

- - -
Why?
-----
`ddns-proxy` was built to provide DDNS functionality for devices that have a limited IETF DDNS client. For example, the ASA 5500-series of routers has a built-in DDNS client that only supports the IETF-defined DDNS update method. We'll simply proxy these requests to either a DNS or HTTP endpoint.

In my case, I'm proxying IETF DDNS updates to the DigitalOcean DNS HTTP API. This is necessary because making a call straight from the ASA to the API wasn't going to happen, obviousy, since the ASA doesn't support HTTP-style DDNS updates. Even if it did, as the Cisco IOS-based routers do, they don't support adding AUTH HTTP headers to the request. So I decided to create `ddns-proxy` as both a technical exercise in `nodejs` and a free self-hosted DDNS update service.

- - -

Essentially, `ddns-proxy` simply uses a `node socket` instance to support the IETF-defined update and a state machine to keep track of connection command sequence. Since authentication isn't available in IETF Most configuration options have defaults, so they aren't required unless necessary.

To run tests, run `grunt test`, which uses the Mocha test runner.

Getting Started
---------------
Before running the app for the first time, you'll want to declare your HTTP settings (optional), routes, and targets in a `ddns-proxy.json` configuration file. See `sample-config.json` for an example.

To start the app, simply run `node ddns-proxy`