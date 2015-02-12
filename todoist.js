'use strict';
/**
 * @module node-todoist
 * @alias todoist
 * @example
 * ```js
 * var todoist = require('node-todoist');
 * ```
 *
 */

var version = require('./package.json').version,
				req = require('request'),
				qs 	= require('querystring'),
				q		= require('q'),
				_		= require('lodash'),
				base= 'https://todoist.com/API/';

module.exports = ( function () {
	var ret = {
		login: login,
		request: request,
		VERSION: version,
	}

	var self = this;
	var r = q.nbind(req);
	var user;		// reference for the user object, including token
	return ret;

	/**
	* Logs into Todoist via email and password. Necessary to get token
	* for authenticated requests
	* @alias module:node-todoist.login
	* @param  {Object}   params 	Object literal containing email and password.
	* @param  {Function} [cb]   	optional callback
	* @return {Promise|callback}	Returns a promise or invokes a callback
	* @example
	* ```js
	* // promise style
	* todoist.login({email: email, password: password})
	* 	.then(function(user){
	* 		console.log(user)
	* 	},
	* 	function(e) { console.error(e); });
	*
	* // callback style
	* todoist.login({email: email, password: password}, function(err,user){
	* 	if(err){
	* 		console.error(err);
	* 		return;
	* 	}
	* 	console.log(user);
	* });
	* ```
	*/
	function login(params,cb) {
		return request('login',params)
			.then(function(data){
					user = data;
					return user;
				})
			.nodeify(cb);
	};

	/**
	 * Queries the specified todoist endpoint with the specified parameters.
	 * For additional, information about `endpoint`s and `option`s, see
	 * the [Todoist API Documentation](https://todoist.com/API/help/standard#).
	 * @alias		module:node-todoist.request
	 * @param  {str}   		endpoint The Todoist endpoint to be queried.
	 * @param  {Object}   params   Object literal specifying the query parameters.
	 * @param  {Function} [cb]     Optional callback parameter. Called with `err` and `data`.
	 * @return {Promise|callback}  Returns a promise or invokes a callback
	 * @see {@link https://todoist.com/API/help/standard#|Todoist API Documentation}
	 * @example
	 * ```js
	 * var my_params = {
	 * 	name: "New Project",
	 * 	color: 5,
	 * 	indent: 3,
	 * 	}
	 *
	 * // promise style
	 * todoist.request('addProject', my_params)
	 * 	.then(function(user){
	 * 		console.log(user)
	 * 	},
	 * 	function(e) { console.error(e); });
	 *
	 * // callback style
	 * todoist.request('addProject', my_params), function(err,data){
	 * 	if(err){
	 * 		console.error(err);
	 * 		return;
	 * 	}
	 * 	console.log(data);
	 * 	```
	 */
	function request(endpoint, params, cb) {
		return r(getPath(endpoint, params))
			.then(format)
			.nodeify(cb);
	};

	function getPath(ep, params) {
		var p = (user && user.token)
			? _.extend({}, params, {token: user.token})
			: params;
		console.log(p);
		return base + ep.toLowerCase() + '?' + qs.stringify(p);
	};

	function format(args){
		return JSON.parse(args[1]);
	}
}());
