'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Rescue = mongoose.model('Rescue'),
	_ = require('lodash');

/**
 * Create a Rescue
 */
exports.create = function(req, res) {
	var rescue = new Rescue(req.body);
	rescue.user = req.user;

	rescue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rescue);
		}
	});
};

/**
 * Show the current Rescue
 */
exports.read = function(req, res) {
	res.jsonp(req.rescue);
};

/**
 * Update a Rescue
 */
exports.update = function(req, res) {
	var rescue = req.rescue ;

	rescue = _.extend(rescue , req.body);

	rescue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rescue);
		}
	});
};

/**
 * Delete an Rescue
 */
exports.delete = function(req, res) {
	var rescue = req.rescue ;

	rescue.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rescue);
		}
	});
};

/**
 * List of Rescues
 */
exports.list = function(req, res) { 
	Rescue.find().sort('-created').populate('user', 'displayName').exec(function(err, rescues) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rescues);
		}
	});
};

/**
 * Rescue middleware
 */
exports.rescueByID = function(req, res, next, id) { 
	Rescue.findById(id).populate('user', 'displayName').exec(function(err, rescue) {
		if (err) return next(err);
		if (! rescue) return next(new Error('Failed to load Rescue ' + id));
		req.rescue = rescue ;
		next();
	});
};

/**
 * Rescue authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rescue.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
