'use strict';

/**
 * Module dependencies.
 */
var petsPolicy = require('../policies/pets.server.policy'),
	pets = require('../controllers/pets.server.controller'),
	petgenres = require('../controllers/petgenres.server.controller'),
	pettypes = require('../controllers/pettypes.server.controller');

module.exports = function(app) {
	// Pets collection routes
	app.route('/api/pets').all(petsPolicy.isAllowed)
		.get(pets.list)
		.post(pets.create);

	// Single pet routes
	app.route('/api/pets/:petId').all(petsPolicy.isAllowed)
		.get(pets.read)
		.put(pets.update)
		.delete(pets.delete);

	//GENRES
	app.route('/api/petgernres').all(petsPolicy.isAllowed)
		.get(petgenres.list)
		.post(petgenres.create);

	// Single pet routes
	app.route('/api/petgernres/:petId').all(petsPolicy.isAllowed)
		.get(petgenres.read)
		.put(petgenres.update)
		.delete(petgenres.delete);

	//TYPES
	app.route('/api/pettypes').all(petsPolicy.isAllowed)
		.get(pettypes.list)
		.post(pettypes.create);

	// Single pet routes
	app.route('/api/pettypes/:petId').all(petsPolicy.isAllowed)
		.get(pettypes.read)
		.put(pettypes.update)
		.delete(pettypes.delete);


	// Finish by binding the pet middleware
	app.param('petId', pets.petByID);
	app.param('petgenreId', petgenres.petgenreByID);
	app.param('pettypeId', pettypes.pettypeByID);
};
