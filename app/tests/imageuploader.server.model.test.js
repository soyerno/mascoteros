'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Imageuploader = mongoose.model('Imageuploader');

/**
 * Globals
 */
var user, imageuploader;

/**
 * Unit tests
 */
describe('Imageuploader Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			imageuploader = new Imageuploader({
				name: 'Imageuploader Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return imageuploader.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			imageuploader.name = '';

			return imageuploader.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Imageuploader.remove().exec();
		User.remove().exec();

		done();
	});
});