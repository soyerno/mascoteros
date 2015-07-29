'use strict';

module.exports = function(app) {
	var vets = require('../controllers/vets.server.controller');
	var vetsPolicy = require('../policies/vets.server.policy');

	// Vets Routes
	app.route('/api/vets').all()
		.get(vets.list).all(vetsPolicy.isAllowed)
		.post(vets.create);

	app.route('/api/vet/:vetSlug').all(vetsPolicy.isAllowed)
		.get(vets.read);

	// Single pet routes
	app.route('/api/vets/:vetId').all(vetsPolicy.isAllowed)
		.get(vets.read)
		.put(vets.update)
		.delete(vets.delete);

	/*app.route('/api/vets/:vetId').all(vetsPolicy.isAllowed)
		.get(vets.read)
		.put(vets.update)
		.delete(vets.delete);*/

	// Finish by binding the Vet middleware
	app.param('vetId', vets.vetByID);
	app.param('vetSlug', vets.vetBySlug);
};
