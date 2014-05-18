var assert = require('assert');

module.exports.assertStatusCode = function (code) {
	return function (err, resp, data ) {
		assert.equal(resp.statusCode, code);
	};
};

module.exports.assertDataReceived = function () {
	return function (err, resp, data) {
		assert.isObject(data);
	};
};

module.exports.assertDataHasProperty = function (prop) {
	return function (err, resp, data) {
		assert.equal(data.hasOwnProperty(prop), true);
	};
};

module.exports.assertSpecificDataReceived = function (prop, val) {
	return function (err, resp, data) {
		assert.equal(data[prop], val);
	};
};