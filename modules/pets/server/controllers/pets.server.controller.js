'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Pet = mongoose.model('Pet'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a pet
 */
exports.create = function(req, res) {
	var pet = new Pet(req.body);
	pet.user = req.user;

	pet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pet);
		}
	});
};

/**
 * Show the current pet
 */
exports.read = function(req, res) {
	res.json(req.pet);
};

/**
 * Update a pet
 */
exports.update = function(req, res) {
	var pet = req.pet;

	pet.title = req.body.title;
	pet.content = req.body.content;

	pet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pet);
		}
	});
};

/**
 * Delete an pet
 */
exports.delete = function(req, res) {
	var pet = req.pet;

	pet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pet);
		}
	});
};

/**
 * List of Pet
 */
exports.list = function(req, res) {
	console.log('pet list');
	Pet.find({user: req.user._id}).sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(pets);
			res.jsonp(pets);
		}
	});
};

/**
 * Pet middleware
 */
exports.petByID = function(req, res, next, id) {
	Pet.findById(id).populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pet) {
		if (err) return next(err);
		if (!pet) return next(new Error('Failed to load pet ' + id));
		req.pet = pet;
		next();
	});
};

exports.petBySlug = function(req, res, next, slug) {
	Pet.findOne({slug: slug}).populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pet) {
		if (err) return next(err);
		if (! pet) return next(new Error('Failed to load Pet ' + slug));
		req.pet = pet;
		next();
	});
};

/**
 * Pet Missing
 */

exports.listMissing = function(req, res) {

	Pet.find({isMissing: true}).sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * Pet Dates
 */
exports.listDates = function(req, res) {

	Pet.find({isFindingDate: true}).sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * Pet Update Missing
 */

exports.updateMissing = function(req, res) {

	var query = { _id: req.pet._id };

	Pet.findOne(query, function (err, doc){
		doc.isMissing = req.body.isMissing;
		doc.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log(doc);
				res.jsonp(doc);
			}
		});
	});
};

/**
 * Pet Update Date
 */

exports.updateFindingDate = function(req, res) {

	var query = { _id: req.pet._id };
	Pet.findOne(query, function (err, doc){
		doc.isFindingDate = req.body.isFindingDate;
		doc.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log(doc);
				res.jsonp(doc);
			}
		});
	});
};

/**
 * Pet Adoption
 */

exports.listAdoption = function(req, res) {

	Pet.find({isAdoption: true}).sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};
