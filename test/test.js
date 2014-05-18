var vows = require('vows'),
	assert = require('assert');

var Todoist = require('../todoist'),
	macros = require('../lib/macros');




vows.describe('Todoist').addBatch({
	'The Todoist API': {
		'when instantiated': {
			topic: new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, function (err,resp,data) {
				return;
			}),

			'returns a Todoist' : function (topic) {
				assert.instanceOf (topic, Todoist);
			},
			'has a user property': macros.assertObjectHasProp('user'),
			'has a request function': function (topic) {
				assert.instanceOf (topic.request, Function);
			}
		},
		'when properly connected': {
			topic: function(){
				new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, this.callback);
			},

			'doesnt throw an error': function (err, resp, data) {
				assert.isNull(err);
			},
			'responds with a 200 OK response': macros.assertStatusCode(200),
			'responds with a data object': macros.assertDataIsObject(),
			'responds with an API token': macros.assertDataHasProp('token'),
			'and it is valid': macros.assertDataHasPropAndVal(
				'token', process.env.TODOIST_TOKEN)
		
		},
		'when connecting with an invalid email/password': {
			topic: function () {
				new Todoist('bademail', 'badpass', this.callback);
			},
			'responds with a 200 OK': macros.assertStatusCode(200),
			'responds with a \'LOGIN_ERROR\'': macros.assertDataEquals(macros.LOGIN_ERROR)
		},
		'when an email or password isn\'t passed': {
			topic: function () {
				new Todoist('', '', this.callback);
			},
			'errors out': function (err, resp, data){
				assert.deepEqual(err, 'Must call Todoist with an email and password');
			}
		}
	}
}).export(module);
