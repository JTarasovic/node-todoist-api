var version = require('./package.json').version,
	request = require('request'),
	cheerio = require('cheerio'),
	qs		= require('querystring'),
	base 	= 'https://todoist.com/API/';


var Todoist = function (email, pass, cb) {
	if (!email || !pass ) {
		cb('Must call Todoist with an email and password');
		return;
	}
	this.user = {};
	this._getIt('login', {email: email, password: pass}, true,
		function (err, resp, data) {
			if (err) {
				cb(err);
				return;
			}
			this.user = data;
			cb(null, resp, this.user);
			return;
		}.bind(this));
	return this;
};

Todoist.VERSION = version;

Todoist.prototype.request = function (ep, params, cb) {
	ep = ep.toLowerCase();
	var JSONresponse = true;
	
	switch (ep) {
		case 'ping':
		case 'deleteUser':
		case 'updateprojectorders':
		case 'deleteproject':
		case 'deletelabel':
		case 'updateorders':
		case 'deleteitems':
		case 'completeitems':
		case 'uncompleteitems':
		case 'updatenote':
		case 'deletenote':
			JSONresponse = false;
			break;
		case 'query':
			break;
		case 'uploadfile':
			break;
	}
	if (!params.hasOwnProperty('token')) {
		params.token = this.user.token;
	}
	this._getIt(ep, params, JSONresponse, cb);
	return;
};



Todoist.prototype._getIt = function (endpoint, params, json, cb) {
	var path = base + endpoint + '?' + qs.stringify(params);
	request(path, function (err, resp, body) {
		if (err) {
			cb(err);
		} else if (json) {
			try{
				cb(null, resp, JSON.parse(body));
			} catch (er) {
				// todoist sends back error response as html
				// won't parse properly but there's not sense in passing that error
				var $ = cheerio.load(body);
				try{
					var temp = $('p').text();
					cb(null, resp, temp);
				} catch (e) {
					cb(null, resp, body);
				}
			}
		} else {
			// send it back as object so that way caller always gets objects
			cb(null, resp, { response: body });
		}
		return;
	});
	return;
};

exports = module.exports = Todoist;
