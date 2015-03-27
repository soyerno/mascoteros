'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Trainer = mongoose.model('Trainer'),
	_ = require('lodash');

/**
 * Create a Trainer
 */
exports.create = function(req, res) {
	var trainer = new Trainer(req.body);
	trainer.user = req.user;

	trainer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trainer);
		}
	});
};

/**
 * Show the current Trainer
 */
exports.read = function(req, res) {
	res.jsonp(req.trainer);
};

/**
 * Update a Trainer
 */
exports.update = function(req, res) {
	var trainer = req.trainer ;

	trainer = _.extend(trainer , req.body);

	trainer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trainer);
		}
	});
};

/**
 * Delete an Trainer
 */
exports.delete = function(req, res) {
	var trainer = req.trainer ;

	trainer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trainer);
		}
	});
};

/**
 * List of Trainers
 */
exports.list = function(req, res) { 
	Trainer.find().sort('-created').populate('user', 'displayName').exec(function(err, trainers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trainers);
		}
	});
};

/**
 * Trainer middleware
 */
exports.trainerByID = function(req, res, next, id) { 
	Trainer.findById(id).populate('user', 'displayName').exec(function(err, trainer) {
		if (err) return next(err);
		if (! trainer) return next(new Error('Failed to load Trainer ' + id));
		req.trainer = trainer ;
		next();
	});
};

/**
 * Trainer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.trainer.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
