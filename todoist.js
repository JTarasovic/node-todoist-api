"use strict";
//! todoist.js transpiled and striped from src/todoist.js
var version = require("./package.json").version,
    assign = require("object-assign"),
    bunyan = require("bunyan"),
    req = require("request"),
    qs = require("querystring"),
    q = require("q");

module.exports = (function () {
	var ret = {
		login: login,
		request: request,
		VERSION: version };

	var self = this;
	var user = undefined;
	var r = q.nbind(req);
	var debug = process.env.TODOIST_DEBUG || false;
	var logger = bunyan.createLogger({ name: "todoist" });
	logger.level(debug ? "debug" : "fatal");
	return ret;

	function login(params, cb) {
		log("login", params);
		return request("login", params).then(function (data) {
			user = data;
			log("user", user);
			return user;
		}).nodeify(cb);
	};

	function request(endpoint, params, cb) {
		log("request", endpoint, params);
		return r(getPath(endpoint, params)).then(format).nodeify(cb);
	};

	function getPath(ep, params) {
		var p = user && user.token ? assign({}, params, { token: user.token }) : params;
		var ret = "https://todoist.com/API/" + ep.toLowerCase() + "?" + qs.stringify(p);
		log("getPath", ret);
		return ret;
	};

	function format(args) {
		log("format", args[1]);
		var def = q.defer();
		try {
			def.resolve(JSON.parse(args[1]));
		} catch (e) {
			def.resolve(args[1]);
		}
		return def.promise;
	}

	function log(msg) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		if (debug) {
			logger.debug(msg, args);
		};
		return;
	}
})();