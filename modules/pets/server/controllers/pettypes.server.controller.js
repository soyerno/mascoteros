'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Pettype = mongoose.model('Pettype'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Pettype
 */
exports.create = function(req, res) {
	var pettype = new Pettype(req.body);
	pettype.user = req.user;

	pettype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pettype);
		}
	});
};

/**
 * Show the current Pettype
 */
exports.read = function(req, res) {
	res.jsonp(req.pettype);
};

/**
 * Update a Pettype
 */
exports.update = function(req, res) {
	var pettype = req.pettype ;

	pettype = _.extend(pettype , req.body);

	pettype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pettype);
		}
	});
};

/**
 * Delete an Pettype
 */
exports.delete = function(req, res) {
	var pettype = req.pettype ;

	pettype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pettype);
		}
	});
};

/**
 * List of Pettypes
 */
exports.list = function(req, res) { 
	Pettype.find().sort('-created').populate('user', 'displayName').exec(function(err, pettypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pettypes);
		}
	});
};

/**
 * Pettype middleware
 */
exports.pettypeByID = function(req, res, next, id) { 
	Pettype.findById(id).populate('user', 'displayName').exec(function(err, pettype) {
		if (err) return next(err);
		if (! pettype) return next(new Error('Failed to load Pettype ' + id));
		req.pettype = pettype ;
		next();
	});
};

/**
 * Pettype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pettype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
