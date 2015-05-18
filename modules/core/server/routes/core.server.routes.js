'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.server.controller');
	var multipart = require('connect-multiparty')();
	/*var multer = require('multer')({
		dest: 'uploads/',
		inMemory: true
	});*/

	//var multipart = require('connect-multiparty')();
	//multiparty = require('multiparty')(),

	// Define error pages
	app.route('/server-error').get(core.renderServerError);
	app.route('/not-found').get(core.renderIndex);

	app.route('/api/upload').post(multipart, core.upload);

	// Define application route
	app.route('/*').get(core.renderIndex);
	app.route('/facebook/').get(core.renderIndex);

};
