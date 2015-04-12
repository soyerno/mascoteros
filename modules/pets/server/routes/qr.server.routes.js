'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	var qr = require('../controllers/qr.server.controller');
	// QR Routes
	app.route('/api/qr/:url')
		.get(qr.generate);
};

