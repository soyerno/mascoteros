'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.server.controller');
	//var multipart = require('connect-multiparty')();
	//multiparty = require('multiparty')(),

	// Define error pages
	app.route('/server-error').get(core.renderServerError);
	app.route('/not-found').get(core.renderNotFound);

	app.route('/api/upload').post(core.upload);

	// Define application route
	app.route('/*').get(core.renderIndex);


};
