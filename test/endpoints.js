var vows = require('vows'),
	assert = require('assert');

var	Todoist = require('../todoist'),
	macros = require('../lib/macros');

var endpoints = [
'/API/login',
'/API/loginWithGoogle',
'/API/ping',
'/API/getTimezones',
'/API/register',
'/API/deleteUser',
'/API/updateUser',
'/API/updateAvatar',
'/API/getProjects',
'/API/getProject',
'/API/addProject',
'/API/updateProject',
'/API/updateProjectOrders',
'/API/deleteProject',
'/API/archiveProject',
'/API/unarchiveProject',
'/API/getLabels',
'/API/addLabel',
'/API/updateLabel',
'/API/updateLabelColor',
'/API/deleteLabel',
'/API/getUncompletedItems',
'/API/getAllCompletedItems',
'/API/getCompletedItems',
'/API/getItemsById',
'/API/addItem',
'/API/updateItem',
'/API/updateOrders',
'/API/moveItems',
'/API/updateRecurringDate',
'/API/deleteItems',
'/API/completeItems',
'/API/uncompleteItems',
'/API/addNote',
'/API/updateNote',
'/API/deleteNote',
'/API/getNotes',
'/API/getNotesData',
'/API/query',
'/API/uploadFile',
'/API/getNotificationSettings',
'/API/updateNotificationSetting'];

function buildBatch () {
	var batch = {};
	endpoints.forEach(function (elem, ind, arr) {
		var method = elem.split('/')[2];

		batch[elem] = {
			topic: function () {
				todo.api(method, {}, this.callback);
			},
			'returns a HTTP 200 OK': macros.assertStatusCode(200),
			'doesn\'t error out': function (err, resp, body) {
				console.log(body);
				assert.isNull(err);
			}
		};
	});
	return batch;
}

var createAddTests = function (arr){
	var ret = {};
	arr.forEach(function (elem, ind, arr) {
		var method = elem.split('/')[2];

		ret[elem] = {
			topic: function () {
				todo.api(method, )
			}
		}
	});
};

var onLogin = function (err, resp, body) {
	var myBatch = buildBatch();
	vows.describe('API Endpoints').addBatch(myBatch).export(module);
};

var todo = new Todoist(process.env.TODOIST_EMAIL, process.env.TODOIST_PASS, onLogin);