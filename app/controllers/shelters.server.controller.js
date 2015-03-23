'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Shelter = mongoose.model('Shelter'),
	_ = require('lodash');

/**
 * Create a Shelter
 */
exports.create = function(req, res) {
	var shelter = new Shelter(req.body);
	shelter.user = req.user;

	shelter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shelter);
		}
	});
};

/**
 * Show the current Shelter
 */
exports.read = function(req, res) {
	res.jsonp(req.shelter);
};

/**
 * Update a Shelter
 */
exports.update = function(req, res) {
	var shelter = req.shelter ;

	shelter = _.extend(shelter , req.body);

	shelter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shelter);
		}
	});
};

/**
 * Delete an Shelter
 */
exports.delete = function(req, res) {
	var shelter = req.shelter ;

	shelter.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shelter);
		}
	});
};

/**
 * List of Shelters
 */
exports.list = function(req, res) { 
	Shelter.find().sort('-created').populate('user', 'displayName').exec(function(err, shelters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shelters);
		}
	});
};

/**
 * Shelter middleware
 */
exports.shelterByID = function(req, res, next, id) { 
	Shelter.findById(id).populate('user', 'displayName').exec(function(err, shelter) {
		if (err) return next(err);
		if (! shelter) return next(new Error('Failed to load Shelter ' + id));
		req.shelter = shelter ;
		next();
	});
};

/**
 * Shelter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.shelter.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
