var vows = require('vows'),
assert = require('assert'),
macros = require('../lib/macros');

var Todoist = require('../todoist'),
todo = {};


vows.describe('/API/getTimezones').addBatch({
	'getTimezones': {
		topic: function setup () {
			todo = new Todoist(process.env.TODOIST_EMAIL, 
				process.env.TODOIST_PASS, this.callback);
		},
		'when queried': {
			topic: function () {
				todo.request('getTimezones',{},this.callback);
			},
			'returns an HTTP 200 OK response': macros.assertStatusCode(200),
			'returns an array': function (err, resp, data) {
				assert.instanceOf(data, Array);
			}
		}
	}
}).export(module);
