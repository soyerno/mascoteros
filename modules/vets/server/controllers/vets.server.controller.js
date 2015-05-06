'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Vet = mongoose.model('Vet'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Vet
 */
exports.create = function(req, res) {
	var vet = new Vet(req.body);
	vet.user = req.user;

	vet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vet);
		}
	});
};

/**
 * Show the current Vet
 */
exports.read = function(req, res) {
	res.jsonp(req.vet);
};

/**
 * Update a Vet
 */
exports.update = function(req, res) {
	var vet = req.vet ;

	vet = _.extend(vet , req.body);

	vet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vet);
		}
	});
};

/**
 * Delete an Vet
 */
exports.delete = function(req, res) {
	var vet = req.vet ;

	vet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vet);
		}
	});
};

/**
 * List of Vets
 */
exports.list = function(req, res) {
	Vet.find({coords: { $geoWithin: { $centerSphere: [ [ parseFloat(req.query.longitude), parseFloat(req.query.latitude)], parseFloat(req.query.radio) ] } }}).sort('-created').populate('user', 'displayName').exec(function(err, vets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vets);
		}
	});
};

/**
 * Vet middleware
 */
exports.vetByID = function(req, res, next, id) { Vet.findById(id).populate('user', 'displayName').exec(function(err, vet) {
		if (err) return next(err);
		if (! vet) return next(new Error('Failed to load Vet ' + id));
		req.vet = vet ;
		next();
	});
};