'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Petgenre = mongoose.model('Petgenre'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Petgenre
 */

exports.create = function(req, res) {
	var petgenre = new Petgenre(req.body);
	petgenre.user = req.user;

	petgenre.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petgenre);
		}
	});
};

/**
 * Show the current Petgenre
 */
exports.read = function(req, res) {
	res.jsonp(req.petgenre);
};

/**
 * Update a Petgenre
 */
exports.update = function(req, res) {
	var petgenre = req.petgenre ;

	petgenre = _.extend(petgenre , req.body);

	petgenre.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petgenre);
		}
	});
};

/**
 * Delete an Petgenre
 */
exports.delete = function(req, res) {
	var petgenre = req.petgenre ;

	petgenre.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petgenre);
		}
	});
};

/**
 * List of Petgenres
 */
exports.list = function(req, res) { 
	Petgenre.find().sort('-created').populate('user', 'displayName').exec(function(err, petgenres) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petgenres);
		}
	});
};

/**
 * Petgenre middleware
 */
exports.petgenreByID = function(req, res, next, id) { 
	Petgenre.findById(id).populate('user', 'displayName').exec(function(err, petgenre) {
		if (err) return next(err);
		if (! petgenre) return next(new Error('Failed to load Petgenre ' + id));
		req.petgenre = petgenre ;
		next();
	});
};

/**
 * Petgenre authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.petgenre.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
