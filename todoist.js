"use strict";
//! todoist.js transpiled and striped from src/todoist.js
var version = require("./package.json").version,
    assign = require("object-assign"),
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
	return ret;

	function login(params, cb) {
		return request("login", params).then(function (data) {
			user = data;
			return user;
		}).nodeify(cb);
	};

	function request(endpoint, params, cb) {
		return r(getPath(endpoint, params)).then(format).nodeify(cb);
	};

	function getPath(ep, params) {
		var p = user && user.token ? assign({}, params, { token: user.token }) : params;


		return "https://todoist.com/API/" + ep.toLowerCase() + "?" + qs.stringify(p);
	};

	function format(args) {
		var def = q.defer();
		try {
			def.resolve(JSON.parse(args[1]));
		} catch (e) {
			def.resolve(args[1]);
		}
		return def.promise;
	}
})();