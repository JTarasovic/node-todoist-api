var vows = require('vows'),
assert = require('assert'),
macros = require('../lib/macros');

var Todoist = require('../todoist'),
todo = {};

var request = function (param){
	return function () {
		todo.request('ping', param, this.callback);
	};
};

vows.describe('/API/ping').addBatch({
	'ping': {
		topic: function setup () {
			todo = new Todoist(process.env.TODOIST_EMAIL, 
				process.env.TODOIST_PASS, this.callback);
		},
		'when queried with a valid token': {
			topic: request({}),
			'returns an HTTP 200 OK response': macros.assertStatusCode(200),
			'returns "ok"': macros.assertDataHasPropAndVal('response', 'ok')
		},
		'when queried with an invalid token': {
			topic: request({token: 'badtoken'}),
			'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401)
		},
		'when queried without a null token': {
			topic: request({token: null}),
			'returns an HTTP 401 Unauthorized Response': macros.assertStatusCode(401)
		}
	}
}).export(module);