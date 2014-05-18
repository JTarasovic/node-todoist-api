var vows = require('vows'),
assert = require('assert'),
macros = require('../lib/macros');

var Todoist = require('../todoist'),
todo = {};

var request = function (param){
	return function () {
		todo.request('getProject', param, this.callback);
	};
};

vows.describe('/API/getProject').addBatch({
	'getProject': {
		topic: function setup () {
			todo = new Todoist(process.env.TODOIST_EMAIL, 
				process.env.TODOIST_PASS, this.callback);
		},
		'when queried with a valid token': {
			'and a valid project ID' : {
				topic: request({project_id: '122980030'}),
				'returns an HTTP 200 OK response': macros.assertStatusCode(200),
				'returns an object': macros.assertDataIsObject(),
				'has a name of "Test - DO NOT DELETE"': 
					macros.assertDataHasPropAndVal('name', 'Test - DO NOT DELETE'),
				'has an id of 122980030': 
					macros.assertDataHasPropAndVal('id', 122980030)
			},
			'and an invalid project ID': {
				topic: request({project_id: '123712341'}),
				'returns an HTTP 200 OK response': macros.assertStatusCode(200),
				'returns "ERROR_PROJECT_NOT_FOUND': macros.assertDataEquals(macros.EPNF),
			},
			'and a malformed project_id': {
				topic: request({project_id: 'badid'}),
				'returns an HTTP 400 Bad Request response': macros.assertStatusCode(400),
				'returns "ERROR_INVALID_PROJECT_ID"': macros.assertDataEquals(macros.EIPI),
				
			}
		},
		'when queried with an invalid token': {
			'and a valid project id': {
				topic: request({token: '1234987124ljhsf871243asdfa', project_id: '122980030' }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),

			},
			'and an invalid project ID': {
				topic: request({token: '1234987124ljhsf871243asdfa', project_id: '1212487234' }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),
			},
			'and a malformed project_id': {
				topic: request({project_id: 'badid'}),
				'returns an HTTP 400 Bad Request response': macros.assertStatusCode(400),
				'returns "Token not correct!"': macros.assertDataEquals(macros.EIPI),
				
			}
		},
		'when queried with a null token' :{
			'and a valid project id': {
				topic: request({token: '1234987124ljhsf871243asdfa', project_id: '122980030' }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),

			},
			'and an invalid project ID': {
				topic: request({token: '1234987124ljhsf871243asdfa', project_id: '1212487234' }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),
			},
			'and a malformed project_id': {
				topic: request({project_id: 'badid'}),
				'returns an HTTP 400 Bad Request response': macros.assertStatusCode(400),
				'returns "Token not correct!"': macros.assertDataEquals(macros.EIPI),
				
			}
		}
	}
}).export(module);