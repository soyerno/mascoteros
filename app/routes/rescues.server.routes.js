'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var rescues = require('../../app/controllers/rescues.server.controller');

	// Rescues Routes
	app.route('/api/rescues')
		.get(rescues.list)
		.post(users.requiresLogin, rescues.create);

	app.route('/api/rescues/:rescueId')
		.get(rescues.read)
		.put(users.requiresLogin, rescues.hasAuthorization, rescues.update)
		.delete(users.requiresLogin, rescues.hasAuthorization, rescues.delete);

	// Finish by binding the Rescue middleware
	app.param('rescueId', rescues.rescueByID);
};
