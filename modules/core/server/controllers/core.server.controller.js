'use strict';

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
