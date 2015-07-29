'use strict';

module.exports = function(app) {
	var rides = require('../controllers/rides.server.controller');
	var ridesPolicy = require('../policies/rides.server.policy');

	// Rides Routes
	app.route('/api/rides').all()
		.get(rides.list).all(ridesPolicy.isAllowed)
		.post(rides.create);

	app.route('/api/rides/:rideId').all(ridesPolicy.isAllowed)
		.get(rides.read)
		.put(rides.update)
		.delete(rides.delete);

	// Finish by binding the Ride middleware
	app.param('rideId', rides.rideByID);
};