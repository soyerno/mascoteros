'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Faq = mongoose.model('Faq'),
	_ = require('lodash');

/**
 * Create a Faq
 */
exports.create = function(req, res) {
	var faq = new Faq(req.body);
	faq.user = req.user;

	faq.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faq);
		}
	});
};

/**
 * Show the current Faq
 */
exports.read = function(req, res) {
	res.jsonp(req.faq);
};

/**
 * Update a Faq
 */
exports.update = function(req, res) {
	var faq = req.faq ;

	faq = _.extend(faq , req.body);

	faq.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faq);
		}
	});
};

/**
 * Delete an Faq
 */
exports.delete = function(req, res) {
	var faq = req.faq ;

	faq.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faq);
		}
	});
};

/**
 * List of Faqs
 */
exports.list = function(req, res) { 
	Faq.find().sort('-created').populate('user', 'displayName').exec(function(err, faqs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faqs);
		}
	});
};

/**
 * Faq middleware
 */
exports.faqByID = function(req, res, next, id) { 
	Faq.findById(id).populate('user', 'displayName').exec(function(err, faq) {
		if (err) return next(err);
		if (! faq) return next(new Error('Failed to load Faq ' + id));
		req.faq = faq ;
		next();
	});
};

/**
 * Faq authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.faq.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
