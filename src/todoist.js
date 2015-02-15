'use strict';
//! todoist.js transpiled and striped from src/todoist.js
/**
 * @module node-todoist
 * @alias todoist
 * @example
 * ```js
 * var todoist = require('node-todoist');
 * ```
 *
 */

const version	= require('./package.json').version,
			assign	= require('object-assign'),
			debug		= require('debug')('todoist'),
			req			= require('request'),
			qs 			= require('querystring'),
			Q				= require('q');

module.exports = ( function () {
	let ret = {
		login: login,
		request: request,
		VERSION: version,
	}

	let self = this;
	let user;		// reference for the user object, including token
	const r = Q.nbind(req);
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
		debug('login', params);
		return request('login',params)
			.then(function(data){
					user = data;
					debug('user', user);
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
	 *```
	 */
	function request(endpoint, params, cb) {
		debug('request', endpoint, params);
		return r(getPath(endpoint, params))
			.then(format)
			.nodeify(cb);
	}

	function getPath(ep, params) {
		let p = (user && user.token)
			? assign({}, params, {token: user.token})
			: params;
		let ret = `https://todoist.com/API/${ep.toLowerCase()}?${qs.stringify(p)}`;
		debug('getPath',ret);
		return ret;
	}

	function format(args){
		debug('format',args[1]);
		let def = Q.defer();
		try{
			def.resolve(JSON.parse(args[1]));
		} catch(e){
			def.resolve(args[1]);
		}
		return def.promise;
	}

}());
