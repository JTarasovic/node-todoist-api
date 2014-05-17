var version = require('./package.json').version,
	request = require('request'),
	qs		= require('querystring'),
	base 	= 'https://todoist.com/API/';


var Todoist = function (email, pass, cb) {
	if (email === undefined || pass === undefined) {
		cb('Must call Todoist with an email and password');
		return;
	}
	this.user = {};
	this._getIt('login', {email: email, password: pass}, true,
		function (err, data) {
			if (err) {
				cb(err);
				return;
			}
			this.user = data;
			cb(null, this.user);
			return;
		}.bind(this));
	return this;
};

Todoist.VERSION = version;

Todoist.prototype.todoist = function (ep, params, cb) {
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
	console.error(ep);
	console.error(params);
	params.token = this.user.token;
	this._getIt(ep, params, JSONresponse, cb);
	return;
};



Todoist.prototype._getIt = function (endpoint, params, json, cb) {
	console.error('Trying to get',endpoint,'with',params,'\n\n');
	request(base + endpoint + '?' + qs.stringify(params), function (err, resp, body) {
		console.error(arguments);
		if (err) {
			cb(err);
		} else if (json) {
			try{
				cb(null, JSON.parse(body));
			} catch (er) {
				cb(err);
			}
		} else {
			// send it back as object so that way caller always gets objects
			cb(null, { response: body });
		}
		return;
	});
	return;
};

exports = module.exports = Todoist;
