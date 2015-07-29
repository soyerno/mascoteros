'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Ride = mongoose.model('Ride'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Ride
 */
exports.create = function(req, res) {
	var ride = new Ride(req.body);
	ride.user = req.user;

	ride.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ride);
		}
	});
};

/**
 * Show the current Ride
 */
exports.read = function(req, res) {
	res.jsonp(req.ride);
};

/**
 * Update a Ride
 */
exports.update = function(req, res) {
	var ride = req.ride ;

	ride = _.extend(ride , req.body);

	ride.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ride);
		}
	});
};

/**
 * Delete an Ride
 */
exports.delete = function(req, res) {
	var ride = req.ride ;

	ride.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ride);
		}
	});
};

/**
 * List of Rides
 */
exports.list = function(req, res) { Ride.find().sort('-created').populate('user', 'displayName').exec(function(err, rides) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rides);
		}
	});
};

/**
 * Ride middleware
 */
exports.rideByID = function(req, res, next, id) { Ride.findById(id).populate('user', 'displayName').exec(function(err, ride) {
		if (err) return next(err);
		if (! ride) return next(new Error('Failed to load Ride ' + id));
		req.ride = ride ;
		next();
	});
};