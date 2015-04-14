'use strict';

var cloudinary = require('cloudinary'),
	imgur = require('imsave')('f0a61bc62ea77fd'),
	fs = require('fs');

cloudinary.config({
	cloud_name: 'hb1bxocye',
	api_key: '869496637818748',
	api_secret: 'ECsv4bAtyqACL3LatYy1D_xu34Q'
});

/**
 * Render the main applicaion page
 */
exports.renderIndex = function(req, res) {
	res.render('modules/core/server/views/index', {
		user: req.user || null
	});
};

/**
 * Render the server error page
 */
exports.renderServerError = function(req, res) {
	res.status(500).render('modules/core/server/views/500', {
		error: 'Oops! Something went wrong...'
	});
};

/**
 * Render the server not found page
 */
exports.renderNotFound = function(req, res) {
	res.status(404).render('modules/core/server/views/404', {
		url: req.originalUrl
	});
};


exports.upload =  function (req, res, next) {
	if (req.files) {
		var provider = req.body.imageProvider || 'cloudinary';
		//var provider = 'cloudinary';
		Object.keys(req.files).forEach(function (field) {

			if (provider === 'cloudinary') {
				var options = {};
				/*if (req.files[field].path.indexOf('.webm') !== -1) {
					options.resource_type = 'raw';
				}*/

				console.log(req.files[field].path);

				cloudinary.uploader.upload(req.files[field].path, function (result) {

					console.log(result);

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
