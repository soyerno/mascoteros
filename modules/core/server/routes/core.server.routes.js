'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.server.controller'),
	//multipart = require('connect-multiparty')(),
	//multiparty = require('multiparty')(),
	multer  = require('multer')();

	// Define error pages
	app.route('/server-error').get(core.renderServerError);
	app.route('/not-found').get(core.renderNotFound);

	// Define application route
	app.route('/*').get(core.renderIndex);
	app.route('/api/upload').post(multer, core.upload);

};
