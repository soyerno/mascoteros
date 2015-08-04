'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PetArticle = mongoose.model('PetArticle'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, petArticle;

/**
 * Pet article routes tests
 */
describe('Pet article CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Pet article
		user.save(function() {
			petArticle = {
				name: 'Pet article Name'
			};

			done();
		});
	});

	it('should be able to save Pet article instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet article
				agent.post('/api/pet-articles')
					.send(petArticle)
					.expect(200)
					.end(function(petArticleSaveErr, petArticleSaveRes) {
						// Handle Pet article save error
						if (petArticleSaveErr) done(petArticleSaveErr);

						// Get a list of Pet articles
						agent.get('/api/pet-articles')
							.end(function(petArticlesGetErr, petArticlesGetRes) {
								// Handle Pet article save error
								if (petArticlesGetErr) done(petArticlesGetErr);

								// Get Pet articles list
								var petArticles = petArticlesGetRes.body;

								// Set assertions
								(petArticles[0].user._id).should.equal(userId);
								(petArticles[0].name).should.match('Pet article Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pet article instance if not logged in', function(done) {
		agent.post('/api/pet-articles')
			.send(petArticle)
			.expect(403)
			.end(function(petArticleSaveErr, petArticleSaveRes) {
				// Call the assertion callback
				done(petArticleSaveErr);
			});
	});

	it('should not be able to save Pet article instance if no name is provided', function(done) {
		// Invalidate name field
		petArticle.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet article
				agent.post('/api/pet-articles')
					.send(petArticle)
					.expect(400)
					.end(function(petArticleSaveErr, petArticleSaveRes) {
						// Set message assertion
						(petArticleSaveRes.body.message).should.match('Please fill Pet article name');
						
						// Handle Pet article save error
						done(petArticleSaveErr);
					});
			});
	});

	it('should be able to update Pet article instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet article
				agent.post('/api/pet-articles')
					.send(petArticle)
					.expect(200)
					.end(function(petArticleSaveErr, petArticleSaveRes) {
						// Handle Pet article save error
						if (petArticleSaveErr) done(petArticleSaveErr);

						// Update Pet article name
						petArticle.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pet article
						agent.put('/api/pet-articles/' + petArticleSaveRes.body._id)
							.send(petArticle)
							.expect(200)
							.end(function(petArticleUpdateErr, petArticleUpdateRes) {
								// Handle Pet article update error
								if (petArticleUpdateErr) done(petArticleUpdateErr);

								// Set assertions
								(petArticleUpdateRes.body._id).should.equal(petArticleSaveRes.body._id);
								(petArticleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pet articles if not signed in', function(done) {
		// Create new Pet article model instance
		var petArticleObj = new PetArticle(petArticle);

		// Save the Pet article
		petArticleObj.save(function() {
			// Request Pet articles
			request(app).get('/api/pet-articles')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pet article if not signed in', function(done) {
		// Create new Pet article model instance
		var petArticleObj = new PetArticle(petArticle);

		// Save the Pet article
		petArticleObj.save(function() {
			request(app).get('/api/pet-articles/' + petArticleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', petArticle.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pet article instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet article
				agent.post('/api/pet-articles')
					.send(petArticle)
					.expect(200)
					.end(function(petArticleSaveErr, petArticleSaveRes) {
						// Handle Pet article save error
						if (petArticleSaveErr) done(petArticleSaveErr);

						// Delete existing Pet article
						agent.delete('/api/pet-articles/' + petArticleSaveRes.body._id)
							.send(petArticle)
							.expect(200)
							.end(function(petArticleDeleteErr, petArticleDeleteRes) {
								// Handle Pet article error error
								if (petArticleDeleteErr) done(petArticleDeleteErr);

								// Set assertions
								(petArticleDeleteRes.body._id).should.equal(petArticleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pet article instance if not signed in', function(done) {
		// Set Pet article user 
		petArticle.user = user;

		// Create new Pet article model instance
		var petArticleObj = new PetArticle(petArticle);

		// Save the Pet article
		petArticleObj.save(function() {
			// Try deleting Pet article
			request(app).delete('/api/pet-articles/' + petArticleObj._id)
			.expect(403)
			.end(function(petArticleDeleteErr, petArticleDeleteRes) {
				// Set message assertion
				(petArticleDeleteRes.body.message).should.match('User is not authorized');

				// Handle Pet article error error
				done(petArticleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			PetArticle.remove().exec(function(){
				done();
			});
		});
	});
});
