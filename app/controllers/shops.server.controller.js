'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Shop = mongoose.model('Shop'),
	_ = require('lodash');

/**
 * Create a Shop
 */
exports.create = function(req, res) {
	var shop = new Shop(req.body);
	shop.user = req.user;

	shop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shop);
		}
	});
};

/**
 * Show the current Shop
 */
exports.read = function(req, res) {
	res.jsonp(req.shop);
};

/**
 * Update a Shop
 */
exports.update = function(req, res) {
	var shop = req.shop ;

	shop = _.extend(shop , req.body);

	shop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shop);
		}
	});
};

/**
 * Delete an Shop
 */
exports.delete = function(req, res) {
	var shop = req.shop ;

	shop.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shop);
		}
	});
};

/**
 * List of Shops
 */
exports.list = function(req, res) { 
	Shop.find().sort('-created').populate('user', 'displayName').exec(function(err, shops) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shops);
		}
	});
};

/**
 * Shop middleware
 */
exports.shopByID = function(req, res, next, id) { 
	Shop.findById(id).populate('user', 'displayName').exec(function(err, shop) {
		if (err) return next(err);
		if (! shop) return next(new Error('Failed to load Shop ' + id));
		req.shop = shop ;
		next();
	});
};

/**
 * Shop authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.shop.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
