'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	config = require('../config'),
  TokenStrategy = require('passport-http-oauth').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy,
  users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	passport.use(new BearerStrategy(
		function(token, done) {
			User.findOne({ token: token }, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				return done(null, user, { scope: 'read' });
			});
		}
	));

	passport.use('token', new TokenStrategy(
		function(consumerKey, done) {
			Consumer.findOne({ key: consumerKey }, function (err, consumer) {
				if (err) { return done(err); }
				if (!consumer) { return done(null, false); }
				return done(null, consumer, consumer.secret);
			});
		},
		function(accessToken, done) {
			AccessToken.findOne({ token: accessToken }, function (err, token) {
				if (err) { return done(err); }
				if (!token) { return done(null, false); }
				Users.findById(token.userId, function(err, user) {
					if (err) { return done(err); }
					if (!user) { return done(null, false); }
					// fourth argument is optional info.  typically used to pass
					// details needed to authorize the request (ex: `scope`)
					return done(null, user, token.secret, { scope: token.scope });
				});
			});
		},
		function(timestamp, nonce, done) {
			// validate the timestamp and nonce as necessary
			done(null, true)
		}
	));
};