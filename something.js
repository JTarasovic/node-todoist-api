var req = require('request'),
	vows = require('vows'),
	assert = require('assert');

vows.describe('something').addBatch({
	'Some context': {
		topic: function () {
			return true;
		},
		'is true': function  (topic) {
			assert.equal(topic, true);
		}
	},
	teardown: function () {
		console.log('well, we\'ve called the teardown...');
		req('https://www.google.com', function (err, resp, body) {
			if (err) {throw err;}
			console.log(resp.statusCode);
		});
	}
}).export(module);