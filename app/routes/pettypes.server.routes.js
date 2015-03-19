'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pettypes = require('../../app/controllers/pettypes.server.controller');

	// Pettypes Routes
	app.route('/pettypes')
		.get(pettypes.list)
		.post(users.requiresLogin, pettypes.create);

	app.route('/pettypes/:pettypeId')
		.get(pettypes.read)
		.put(users.requiresLogin, pettypes.hasAuthorization, pettypes.update)
		.delete(users.requiresLogin, pettypes.hasAuthorization, pettypes.delete);

	// Finish by binding the Pettype middleware
	app.param('pettypeId', pettypes.pettypeByID);
};
