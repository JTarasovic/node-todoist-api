var assert = require('assert');

module.exports.assertObjectHasProp = function (prop) {
	return function (topic) {
		assert.equal(topic.hasOwnProperty(prop),true);
	};
};

module.exports.assertStatusCode = function (code) {
	return function (err, resp, data ) {
		assert.equal(resp.statusCode, code);
	};
};

module.exports.assertDataIsObject = function () {
	return function (err, resp, data) {
		assert.isObject(data);
	};
};

module.exports.assertDataHasProp = function (prop) {
	return function (err, resp, data) {
		assert.equal(data.hasOwnProperty(prop), true);
	};
};

module.exports.assertDataHasPropAndVal = function (prop, val) {
	return function (err, resp, data) {
		// (prop, val) leaks key when not true
		// this protects it.
		assert.equal(data[prop] === val, true);
	};
};

module.exports.assertDataEquals = function (val){
	return function (err, resp, data){
		assert.deepEqual(data, val);
	};
};

module.exports.saveValue = function (arr, val) {
	return function (err, resp, data) {
		arr.push(data[val]);
	};
};

module.exports.debug = function () {
	return function (err, resp, data) {
		console.dir(data);
	};
};

module.exports.EPNF = 'ERROR_PROJECT_NOT_FOUND';
module.exports.EIPI = 'ERROR_INVALID_PROJECT_ID';
module.exports.ENIE = 'ERROR_NAME_IS_EMPTY';
module.exports.TNC = 'Token not correct!';
module.exports.LE = 'LOGIN_ERROR';
module.exports.BAD_TOKEN = '123ABC4987124LJHFS871243ASDFA';

