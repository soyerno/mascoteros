'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Imageuploader = mongoose.model('Imageuploader'),
  cloudinary = require('cloudinary'),
  imgur = require('imsave')('f0a61bc62ea77fd'),
  fs = require('fs'),

  _ = require('lodash');

cloudinary.config({
  cloud_name: 'hb1bxocye',
  api_key: '869496637818748',
  api_secret: 'ECsv4bAtyqACL3LatYy1D_xu34Q'
});

/**
 * Create a Imageuploader
 */
exports.create = function(req, res) {
	var imageuploader = new Imageuploader(req.body);
	imageuploader.user = req.user;

	imageuploader.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(imageuploader);
		}
	});
};

/**
 * Show the current Imageuploader
 */
exports.read = function(req, res) {
	res.jsonp(req.imageuploader);
};

/**
 * Update a Imageuploader
 */
exports.update = function(req, res) {
	var imageuploader = req.imageuploader ;

	imageuploader = _.extend(imageuploader , req.body);

	imageuploader.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(imageuploader);
		}
	});
};

/**
 * Delete an Imageuploader
 */
exports.delete = function(req, res) {
	var imageuploader = req.imageuploader ;

	imageuploader.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(imageuploader);
		}
	});
};

/**
 * List of Imageuploaders
 */
exports.list = function(req, res) { 
	Imageuploader.find().sort('-created').populate('user', 'displayName').exec(function(err, imageuploaders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(imageuploaders);
		}
	});
};

/**
 * Imageuploader middleware
 */
exports.imageuploaderByID = function(req, res, next, id) { 
	Imageuploader.findById(id).populate('user', 'displayName').exec(function(err, imageuploader) {
		if (err) return next(err);
		if (! imageuploader) return next(new Error('Failed to load Imageuploader ' + id));
		req.imageuploader = imageuploader ;
		next();
	});
};

/**
 * Imageuploader authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.imageuploader.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


exports.upload =  function (req, res, next) {
  if (req.files) {

    var provider = req.body.imageProvider || 'cloudinary';
    Object.keys(req.files).forEach(function (field) {
      if (provider === 'cloudinary') {
        var options = {};
        if (req.files[field].path.indexOf('.webm') !== -1) {
          options.resource_type = 'raw';
        }

        cloudinary.uploader.upload(req.files[field].path, function (result) {
          var url = result.url;
          if (process.env.CLOUDINARY_PROXY_CNAME) {
            url = url.replace(/res\.cloudinary\.com/, process.env.CLOUDINARY_PROXY_CNAME);
          }
          res.jsonp({
            url: url
          });
          /*helpers.handleResponse(res, null, {
            url: url
          }, next);*/
        }, options);
      } else if (provider === 'imgur') {
        imgur(fs.readFileSync(req.files[field].path), function (err, url) {
          if (err) {
            console.log(err);
          }
          res.jsonp({
            url: url
          });
/*
          helpers.handleResponse(res, null, {
            url: url
          }, next);*/
        });
      }
    });
  }
};
