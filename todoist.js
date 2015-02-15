"use strict";
//! todoist.js transpiled and striped from src/todoist.js
var version = require("./package.json").version,
    assign = require("object-assign"),
    debug = require("debug")("todoist"),
    req = require("request"),
    qs = require("querystring"),
    Q = require("q");

module.exports = (function () {
	var ret = {
		login: login,
		request: request,
		VERSION: version };

	var self = this;
	var user = undefined;
	var r = Q.nbind(req);
	return ret;

	function login(params, cb) {
		debug("login", params);
		return request("login", params).then(function (data) {
			user = data;
			debug("user", user);
			return user;
		}).nodeify(cb);
	};

	function request(endpoint, params, cb) {
		debug("request", endpoint, params);
		return r(getPath(endpoint, params)).then(format).nodeify(cb);
	}

	function getPath(ep, params) {
		var p = user && user.token ? assign({}, params, { token: user.token }) : params;
		var ret = "https://todoist.com/API/" + ep.toLowerCase() + "?" + qs.stringify(p);
		debug("getPath", ret);
		return ret;
	}

	function format(args) {
		debug("format", args[1]);
		var def = Q.defer();
		try {
			def.resolve(JSON.parse(args[1]));
		} catch (e) {
			def.resolve(args[1]);
		}
		return def.promise;
	}
})();