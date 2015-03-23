'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vets = require('../../app/controllers/vets.server.controller');

	// Vets Routes
	app.route('/vets')
		.get(vets.list)
		.post(users.requiresLogin, vets.create);

	app.route('/vets/:vetId')
		.get(vets.read)
		.put(users.requiresLogin, vets.hasAuthorization, vets.update)
		.delete(users.requiresLogin, vets.hasAuthorization, vets.delete);

	// Finish by binding the Vet middleware
	app.param('vetId', vets.vetByID);
};
