'use strict';

/**
 * Module dependencies.
 */
var qr = require('qr-image'),
	_ = require('lodash');


exports.generate = function(req, res) {
	//req.param('url');
	var code = qr.image(req.param('url'), { type: 'svg' });
	res.type('svg');
	code.pipe(res);
};
