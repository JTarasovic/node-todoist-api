var vows = require('vows'),
assert = require('assert'),
macros = require('../lib/macros');

var Todoist = require('../todoist'),
todo = {};

var request = function (param){
	return function () {
		todo.request('addProject', param, this.callback);
	};
};

// grab a 10 digit name.
var project_name = Math.random().toString(36).substring(2,12);
var idArr = [];

vows.describe('/API/addProject').addBatch({
	'addProject': {
		topic: function setup () {
			todo = new Todoist(process.env.TODOIST_EMAIL, 
				process.env.TODOIST_PASS, this.callback);
		},
		'when queried with a valid token': {
			'and a valid project name' : {
				topic: request({name: project_name}),
				'returns an HTTP 200 OK response': macros.assertStatusCode(200),
				'returns an object': macros.assertDataIsObject(),
				'has the same name': 
				macros.assertDataHasPropAndVal('name', project_name),
				'has an id': macros.assertDataHasProp('id'),
				'save the id': macros.saveValue(idArr, 'id'),
				'that is already taken?': {
					'...it don\'t care': {
						topic: request({name: project_name}),
						'returns an HTTP 200 OK response': macros.assertStatusCode(200),
						'returns an object': macros.assertDataIsObject(),
						'has the same name': 
						macros.assertDataHasPropAndVal('name', project_name),
						'has an id': macros.assertDataHasProp('id'),
						'save the id': macros.saveValue(idArr, 'id'),
					}
				},
				
			},
			'and a null project name': {
				topic: request({name: null}),
				'returns an HTTP 200 OK response': macros.assertStatusCode(200),
				'returns "ERROR_NAME_IS_EMPTY': macros.assertDataEquals(macros.ENIE),
			},
			'and a missing name parameter': {
				topic: request({}),
				'returns an HTTP 400 Bad Request response': macros.assertStatusCode(400),
				'returns missing arguments message': macros.assertDataEquals(macros.MISSING_ARGS)
			}
		},		
		'when queried with an invalid token': {
			'and a valid project name': {
				topic: request({token: macros.BAD_TOKEN, name: project_name }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),

			}
		},
		'when queried with a null token' :{
			'and a valid project id': {
				topic: request({token: null, name: project_name }),
				'returns an HTTP 401 Unauthorized response': macros.assertStatusCode(401),
				'returns "Token not correct!"': macros.assertDataEquals(macros.TNC),

			}
		}
	}
}).export(module);