'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Petbreed = mongoose.model('Petbreed'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Petbreed
 */
exports.create = function(req, res) {
	var petbreed = new Petbreed(req.body);
	petbreed.user = req.user;

	petbreed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

/**
 * Show the current Petbreed
 */
exports.read = function(req, res) {
	res.jsonp(req.petbreed);
};

/**
 * Update a Petbreed
 */
exports.update = function(req, res) {
	var petbreed = req.petbreed ;

	petbreed = _.extend(petbreed , req.body);

	petbreed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

/**
 * Delete an Petbreed
 */
exports.delete = function(req, res) {
	var petbreed = req.petbreed ;

	petbreed.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

/**
 * List of Petbreeds
 */
exports.list = function(req, res) { Petbreed.find().sort('-created').populate('user', 'displayName').populate('pettype', 'name').exec(function(err, petbreeds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreeds);
		}
	});
};

/**
 * Petbreed middleware
 */
exports.petbreedByID = function(req, res, next, id) { Petbreed.findById(id).populate('user', 'displayName').populate('pettype', 'name').exec(function(err, petbreed) {
		if (err) return next(err);
		if (! petbreed) return next(new Error('Failed to load Petbreed ' + id));
		req.petbreed = petbreed ;
		next();
	});
};
