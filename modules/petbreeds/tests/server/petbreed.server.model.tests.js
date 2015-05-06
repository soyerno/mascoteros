'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Petbreed = mongoose.model('Petbreed');

/**
 * Globals
 */
var user, petbreed;

/**
 * Unit tests
 */
describe('Petbreed Model Unit Tests:', function() {
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
			petbreed = new Petbreed({
				name: 'Petbreed Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return petbreed.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			petbreed.name = '';

			return petbreed.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Petbreed.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
