'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pets = require('../../app/controllers/pets.server.controller');

	// Pets Routes
	app.route('/pets')
		.get(pets.list)
		.post(users.requiresLogin, pets.create);

	app.route('/pets/:petId')
		.get(pets.read)
		.put(users.requiresLogin, pets.hasAuthorization, pets.update)
		.delete(users.requiresLogin, pets.hasAuthorization, pets.delete);

	// Finish by binding the Pet middleware
	app.param('petId', pets.petByID);
};
