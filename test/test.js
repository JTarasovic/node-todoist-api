var vows = require('vows'),
	assert = require('assert');

var Todoist = require('../todoist'),
	macros = require('../lib/macros');




vows.describe('Todoist').addBatch({
	'The Todoist API': {
		'when instantiated': {
			topic: new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, function (err,resp,body) {
				return;
			}),

			'returns a Todoist' : function (topic) {
				assert.instanceOf (topic, Todoist);
			},
			'has a user property': function (topic) {
				assert.equal(topic.hasOwnProperty('user'), true);
			},
			'has a _getIt property': function (topic) {
				assert.equal(topic.hasOwnProperty('user'), true);
			},
			'and it\'s a function': function (topic) {
				assert.instanceOf (topic._getIt, Function);
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
			'responds with a data object': macros.assertDataReceived(),
			'responds with an API token': macros.assertDataHasProperty('token'),
			'and it is valid': macros.assertSpecificDataReceived('token', process.env.TODOIST_TOKEN)
		},
		'when connecting with an invalid email/password': {
			topic: function () {
				new Todoist('bademail', 'badpass', this.callback);
			},
			'responds with a 200 OK': macros.assertStatusCode(200),
			'responds with a \'LOGIN_ERROR\'': function (err, resp, body) {
				assert.deepEqual(body, 'LOGIN_ERROR');
			}
		},
		'when an email or password isn\'t passed': {
			topic: function () {
				new Todoist('', '', this.callback);
			},
			'errors out': function (err, resp, body){
				assert.deepEqual(err, 'Must call Todoist with an email and password');
			}
		}
	}
}).export(module);
