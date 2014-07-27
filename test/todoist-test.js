var mocha = require('mocha'),
should = require('should');

var Todoist = require('../todoist'),
macros = require('../lib/macros');





describe('The Todoist API when instantiated', function () {
	var todo;
	before(function (done) {
		todo = new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, done);
	});

	it('should be a Todoist', function () {
		todo.should.be.an.instanceof(Todoist);
	});

	it('should have a user property which is an object', function () {
		todo.should.have.a.property('user').which.is.an.Object;
	});

	it('should have a request function', function () {
		todo.should.have.a.property('request').which.is.a.Function;
	});
});


describe('when properly connected', function() {
	var todo;
	before(function () {
		todo = new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, function (err,resp,data) {
			console.dir(arguments);
			it('should not throw an error', function () {
		should.not.exist(err);
	});

	it('should respond with a 200', function () {
		resp.has.status(200);
	});

	it('should respond with a data object', function () {
		data.is.Object;
	});

	it('should respond with a valid API token', function () {
		data.has.property('token').which.is.equal(process.env.TODOIST_TOKEN);
	});
			done();
		});
	});
});

/*		'when connecting with an invalid email/password': {
			topic: function () {
				new Todoist('bademail', 'badpass', this.callback);
			},
			'responds with a 200 OK': macros.assertStatusCode(200),
			'responds with a \'LOGIN_ERROR\'': macros.assertDataEquals(macros.LE)
		},
		'when an email or password isn\'t passed': {
			topic: function () {
				new Todoist('', '', this.callback);
			},
			'errors out': function (err, resp, data){
				assert.deepEqual(err, 'Must call Todoist with an email and password');
			}
		}*/
