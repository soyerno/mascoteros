'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	var qr = require('../../app/controllers/qr.server.controller');
	// QR Routes
	app.route('/qr/:url')
		.get(qr.generate);
};

