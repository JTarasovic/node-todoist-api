var vows = require('vows'),
assert = require('assert'),
macros = require('../lib/macros');

var Todoist = require('../todoist'),
todo = {};

var request = function (param){
	return function () {
		todo.request('getProjects', param, this.callback);
	};
};


vows.describe('/API/getProjects').addBatch({
	'getProjects': {
		topic: function setup () {
			todo = new Todoist(process.env.TODOIST_EMAIL, 
				process.env.TODOIST_PASS, this.callback);
		},
		'when queried with a valid token': {
			topic: request({}),
			'returns an HTTP 200 OK response': macros.assertStatusCode(200),
			'returns an array of projects': function (err, resp, data) {
				assert.instanceOf(data, Array);
			}
		},
		'when queried with an invalid token': {
			topic: request({token: macros.BAD_TOKEN}),
			'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
			'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),

		},
		'when queried with a null token' :{
			topic: request({token: null}),
			'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
			'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),
		}
	}
}).export(module);