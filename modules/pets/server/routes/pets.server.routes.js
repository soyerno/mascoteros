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

	app.route('/api/pet/:petSlug')
		.get(pets.read);

	// Single pet routes
	app.route('/api/pets/:petId').all(petsPolicy.isAllowed)
		.get(pets.read)
		.put(pets.update)
		.delete(pets.delete);

	//GENRES
	app.route('/api/petgenres').all(petsPolicy.isAllowed)
		.get(petgenres.list)
		.post(petgenres.create);

	// Single pet routes
	app.route('/api/petgenres/:petId').all(petsPolicy.isAllowed)
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

	app.route('/api/pets/adoption').all(petsPolicy.isAllowed)
		.get(pets.listAdoption);

	app.route('/api/pets/missing').all(petsPolicy.isAllowed)
		.get(pets.listMissing);

	/*app.route('/api/pets/buscar').all(petsPolicy.isAllowed)
		.post(pets.list);*/

	/*app.route('/api/pets/:petId/addLike')
		.get(users.requiresLogin, pets.read);*/

	app.route('/api/pets/:petId/missing').all(petsPolicy.isAllowed)
		.put(pets.updateMissing);


	// Finish by binding the pet middleware
	app.param('petId', pets.petByID);
	app.param('petSlug', pets.petBySlug);
	app.param('petgenreId', petgenres.petgenreByID);
	app.param('pettypeId', pettypes.pettypeByID);
};
