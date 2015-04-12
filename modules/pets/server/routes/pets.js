'use strict';

/**
 * Module dependencies.
 */
var petsPolicy = require('../policies/pets.server.policy'),
	pets = require('../controllers/pets.server.controller');

module.exports = function(app) {
	// Pets collection routes
	app.route('/api/pets').all(petsPolicy.isAllowed)
		.get(pets.list)
		.post(pets.create);

	// Single article routes
	app.route('/api/pets/:petId').all(petsPolicy.isAllowed)
		.get(pets.read)
		.put(pets.update)
		.delete(pets.delete);

	// Finish by binding the article middleware
	app.param('petId', pets.petByID);
};
