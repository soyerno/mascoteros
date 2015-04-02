'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pets = require('../../app/controllers/pets.server.controller');

	// Pets Routes
  app.route('/pet/:petSlug')
    .get(pets.read);

  app.route('/pets')
		.get(pets.list)
		.post(users.requiresLogin, pets.create);

	app.route('/pets/adoption')
		.get(users.requiresLogin, pets.listAdoption);

	app.route('/pets/buscar')
		.post(users.requiresLogin, pets.list);

	app.route('/pets/:petId/addLike')
		.get(users.requiresLogin, pets.read);

  app.route('/pets/:petId')
		.get(pets.read)
		.put(users.requiresLogin, pets.hasAuthorization, pets.update)
		.delete(users.requiresLogin, pets.hasAuthorization, pets.delete);

	app.route('/pets/:petId/missing')
		.put(users.requiresLogin, pets.hasAuthorization, pets.update);

	// Finish by binding the Pet middleware
	app.param('petId', pets.petByID);
    app.param('petSlug', pets.petBySlug);
};
