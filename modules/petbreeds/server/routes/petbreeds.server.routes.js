'use strict';

module.exports = function(app) {
	var petbreeds = require('../controllers/petbreeds.server.controller');
	var petbreedsPolicy = require('../policies/petbreeds.server.policy');

	// Petbreeds Routes
	app.route('/api/petbreeds').all()
		.get(petbreeds.list).all(petbreedsPolicy.isAllowed)
		.post(petbreeds.create);

	app.route('/api/petbreeds/:petbreedId').all(petbreedsPolicy.isAllowed)
		.get(petbreeds.read)
		.put(petbreeds.update)
		.delete(petbreeds.delete);

	app.route('/private/petbreeds/caninos').all(petbreedsPolicy.isAllowed)
		.get(petbreeds.caninosFromArrays);

	app.route('/private/petbreeds/felinos').all(petbreedsPolicy.isAllowed)
		.get(petbreeds.felinosFromArrays);

	// Finish by binding the Petbreed middleware
	app.param('petbreedId', petbreeds.petbreedByID);
	app.param('typeId', petbreeds.list);
};
