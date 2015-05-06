'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Petbreed = mongoose.model('Petbreed'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, petbreed;

/**
 * Petbreed routes tests
 */
describe('Petbreed CRUD tests', function() {
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

		// Save a user to the test db and create new Petbreed
		user.save(function() {
			petbreed = {
				name: 'Petbreed Name'
			};

			done();
		});
	});

	it('should be able to save Petbreed instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petbreed
				agent.post('/api/petbreeds')
					.send(petbreed)
					.expect(200)
					.end(function(petbreedSaveErr, petbreedSaveRes) {
						// Handle Petbreed save error
						if (petbreedSaveErr) done(petbreedSaveErr);

						// Get a list of Petbreeds
						agent.get('/api/petbreeds')
							.end(function(petbreedsGetErr, petbreedsGetRes) {
								// Handle Petbreed save error
								if (petbreedsGetErr) done(petbreedsGetErr);

								// Get Petbreeds list
								var petbreeds = petbreedsGetRes.body;

								// Set assertions
								(petbreeds[0].user._id).should.equal(userId);
								(petbreeds[0].name).should.match('Petbreed Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Petbreed instance if not logged in', function(done) {
		agent.post('/api/petbreeds')
			.send(petbreed)
			.expect(403)
			.end(function(petbreedSaveErr, petbreedSaveRes) {
				// Call the assertion callback
				done(petbreedSaveErr);
			});
	});

	it('should not be able to save Petbreed instance if no name is provided', function(done) {
		// Invalidate name field
		petbreed.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petbreed
				agent.post('/api/petbreeds')
					.send(petbreed)
					.expect(400)
					.end(function(petbreedSaveErr, petbreedSaveRes) {
						// Set message assertion
						(petbreedSaveRes.body.message).should.match('Please fill Petbreed name');
						
						// Handle Petbreed save error
						done(petbreedSaveErr);
					});
			});
	});

	it('should be able to update Petbreed instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petbreed
				agent.post('/api/petbreeds')
					.send(petbreed)
					.expect(200)
					.end(function(petbreedSaveErr, petbreedSaveRes) {
						// Handle Petbreed save error
						if (petbreedSaveErr) done(petbreedSaveErr);

						// Update Petbreed name
						petbreed.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Petbreed
						agent.put('/api/petbreeds/' + petbreedSaveRes.body._id)
							.send(petbreed)
							.expect(200)
							.end(function(petbreedUpdateErr, petbreedUpdateRes) {
								// Handle Petbreed update error
								if (petbreedUpdateErr) done(petbreedUpdateErr);

								// Set assertions
								(petbreedUpdateRes.body._id).should.equal(petbreedSaveRes.body._id);
								(petbreedUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Petbreeds if not signed in', function(done) {
		// Create new Petbreed model instance
		var petbreedObj = new Petbreed(petbreed);

		// Save the Petbreed
		petbreedObj.save(function() {
			// Request Petbreeds
			request(app).get('/api/petbreeds')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Petbreed if not signed in', function(done) {
		// Create new Petbreed model instance
		var petbreedObj = new Petbreed(petbreed);

		// Save the Petbreed
		petbreedObj.save(function() {
			request(app).get('/api/petbreeds/' + petbreedObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', petbreed.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Petbreed instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petbreed
				agent.post('/api/petbreeds')
					.send(petbreed)
					.expect(200)
					.end(function(petbreedSaveErr, petbreedSaveRes) {
						// Handle Petbreed save error
						if (petbreedSaveErr) done(petbreedSaveErr);

						// Delete existing Petbreed
						agent.delete('/api/petbreeds/' + petbreedSaveRes.body._id)
							.send(petbreed)
							.expect(200)
							.end(function(petbreedDeleteErr, petbreedDeleteRes) {
								// Handle Petbreed error error
								if (petbreedDeleteErr) done(petbreedDeleteErr);

								// Set assertions
								(petbreedDeleteRes.body._id).should.equal(petbreedSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Petbreed instance if not signed in', function(done) {
		// Set Petbreed user 
		petbreed.user = user;

		// Create new Petbreed model instance
		var petbreedObj = new Petbreed(petbreed);

		// Save the Petbreed
		petbreedObj.save(function() {
			// Try deleting Petbreed
			request(app).delete('/api/petbreeds/' + petbreedObj._id)
			.expect(403)
			.end(function(petbreedDeleteErr, petbreedDeleteRes) {
				// Set message assertion
				(petbreedDeleteRes.body.message).should.match('User is not authorized');

				// Handle Petbreed error error
				done(petbreedDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Petbreed.remove().exec(function(){
				done();
			});
		});
	});
});
