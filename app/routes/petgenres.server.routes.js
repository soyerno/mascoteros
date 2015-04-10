'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var petgenres = require('../../app/controllers/petgenres.server.controller');

	// Petgenres Routes
	app.route('/api/petgenres')
		.get(petgenres.list)
		.post(users.requiresLogin, petgenres.create);

	app.route('/api/petgenres/:petgenreId')
		.get(petgenres.read)
		.put(users.requiresLogin, petgenres.hasAuthorization, petgenres.update)
		.delete(users.requiresLogin, petgenres.hasAuthorization, petgenres.delete);

	// Finish by binding the Petgenre middleware
	app.param('petgenreId', petgenres.petgenreByID);
};
