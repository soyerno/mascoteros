'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pet = mongoose.model('Pet'),
	_ = require('lodash');

/**
 * Create a Pet
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
			res.jsonp(pet);
		}
	});
};

/**
 * Show the current Pet
 */
exports.read = function(req, res) {
  res.jsonp(req.pet);
};

/**
 * Update a Pet
 */
exports.update = function(req, res) {
	var pet = req.pet ;

	pet = _.extend(pet , req.body);

	pet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pet);
		}
	});
};

exports.updateMissing = function(req, res) {

	console.log(req.body.isMissing);
	console.log('-----------------------------------');

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
 * Delete an Pet
 */
exports.delete = function(req, res) {
	var pet = req.pet ;

	pet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pet);
		}
	});
};

/**
 * List of Pets
 */
/*exports.list = function(req, res) {
	Pet.find().sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};*/
exports.list = function(req, res) {

	Pet.find({user: req.user._id}).sort('-created').populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

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
 * Pet middleware
 */
exports.petByID = function(req, res, next, id) { 
	Pet.findById(id).populate('user', 'displayName').populate('genre').populate('type').exec(function(err, pet) {
		if (err) return next(err);
		if (! pet) return next(new Error('Failed to load Pet ' + id));
		req.pet = pet ;
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
 * Pet authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pet.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
