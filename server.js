'use strict';

/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	log4js = require('log4js'),
	logger = log4js.getLogger(),
	chalk = require('chalk');

log4js.configure(__dirname + '/config/logging.json');

/**
 * Module dependencies.
 */
var config = require('./config/config'),
	mongoose = require('./config/lib/mongoose'),
	express = require('./config/lib/express');

// Initialize mongoose
mongoose.connect(function (db) {
	// Initialize express
	var app = express.init(db);

	// Start the app by listening on <port>
	app.listen(config.port);

	// Logging initialization
	console.log('MEAN.JS application started on port ' + config.port);
});
