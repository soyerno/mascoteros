'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PetArticle = mongoose.model('PetArticle');

/**
 * Globals
 */
var user, petArticle;

/**
 * Unit tests
 */
describe('Pet article Model Unit Tests:', function() {
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
			petArticle = new PetArticle({
				name: 'Pet article Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return petArticle.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			petArticle.name = '';

			return petArticle.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PetArticle.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
