'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var trainers = require('../../app/controllers/trainers.server.controller');

	// Trainers Routes
	app.route('/trainers')
		.get(trainers.list)
		.post(users.requiresLogin, trainers.create);

	app.route('/trainers/:trainerId')
		.get(trainers.read)
		.put(users.requiresLogin, trainers.hasAuthorization, trainers.update)
		.delete(users.requiresLogin, trainers.hasAuthorization, trainers.delete);

	// Finish by binding the Trainer middleware
	app.param('trainerId', trainers.trainerByID);
};
