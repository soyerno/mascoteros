'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
  users = require('../../controllers/users.server.controller'),
  FacebookTokenStrategy = require('passport-facebook-token').Strategy;

module.exports = function(config) {
  passport.use(new FacebookTokenStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret
    },
    function(accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
        provider: 'facebook',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};