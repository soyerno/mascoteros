'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash'),
	path = require('path'),
	qr = require('qr-image'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.generate = function(req, res) {

	//req.param('url');
	/*var code = qr.imageSync(req.param('url'), { type: 'image/png' });
	res.type('image/png');
	code.pipe(res);*/

	var ec_level = 'M',
		options = {
			margin: 0
		};
	var img = qr.image('http://www.mascoteros.net/pet/' + req.param('url'), [ec_level | options]);
	res.writeHead(200, {'Content-Type': 'image/png'});
	img.pipe(res);
};
