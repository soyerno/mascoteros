'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var shelters = require('../../app/controllers/shelters.server.controller');

	// Shelters Routes
	app.route('/shelters')
		.get(shelters.list)
		.post(users.requiresLogin, shelters.create);

	app.route('/shelters/:shelterId')
		.get(shelters.read)
		.put(users.requiresLogin, shelters.hasAuthorization, shelters.update)
		.delete(users.requiresLogin, shelters.hasAuthorization, shelters.delete);

	// Finish by binding the Shelter middleware
	app.param('shelterId', shelters.shelterByID);
};
