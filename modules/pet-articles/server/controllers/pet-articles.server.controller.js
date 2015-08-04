'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	PetArticle = mongoose.model('PetArticle'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Pet article
 */
exports.create = function(req, res) {
	var petArticle = new PetArticle(req.body);
	petArticle.user = req.user;

	petArticle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petArticle);
		}
	});
};

/**
 * Show the current Pet article
 */
exports.read = function(req, res) {
	res.jsonp(req.petArticle);
};

/**
 * Update a Pet article
 */
exports.update = function(req, res) {
	var petArticle = req.petArticle ;

	petArticle = _.extend(petArticle , req.body);

	petArticle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petArticle);
		}
	});
};

/**
 * Delete an Pet article
 */
exports.delete = function(req, res) {
	var petArticle = req.petArticle ;

	petArticle.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petArticle);
		}
	});
};

/**
 * List of Pet articles
 */
exports.list = function(req, res) { PetArticle.find().sort('-created').populate('user', 'displayName').exec(function(err, petArticles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petArticles);
		}
	});
};

/**
 * Pet article middleware
 */
exports.petArticleByID = function(req, res, next, id) { PetArticle.findById(id).populate('user', 'displayName').exec(function(err, petArticle) {
		if (err) return next(err);
		if (! petArticle) return next(new Error('Failed to load Pet article ' + id));
		req.petArticle = petArticle ;
		next();
	});
};