'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Vet = mongoose.model('Vet'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, vet;

/**
 * Vet routes tests
 */
describe('Vet CRUD tests', function() {
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

		// Save a user to the test db and create new Vet
		user.save(function() {
			vet = {
				name: 'Vet Name'
			};

			done();
		});
	});

	it('should be able to save Vet instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vet
				agent.post('/api/vets')
					.send(vet)
					.expect(200)
					.end(function(vetSaveErr, vetSaveRes) {
						// Handle Vet save error
						if (vetSaveErr) done(vetSaveErr);

						// Get a list of Vets
						agent.get('/api/vets')
							.end(function(vetsGetErr, vetsGetRes) {
								// Handle Vet save error
								if (vetsGetErr) done(vetsGetErr);

								// Get Vets list
								var vets = vetsGetRes.body;

								// Set assertions
								(vets[0].user._id).should.equal(userId);
								(vets[0].name).should.match('Vet Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Vet instance if not logged in', function(done) {
		agent.post('/api/vets')
			.send(vet)
			.expect(403)
			.end(function(vetSaveErr, vetSaveRes) {
				// Call the assertion callback
				done(vetSaveErr);
			});
	});

	it('should not be able to save Vet instance if no name is provided', function(done) {
		// Invalidate name field
		vet.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vet
				agent.post('/api/vets')
					.send(vet)
					.expect(400)
					.end(function(vetSaveErr, vetSaveRes) {
						// Set message assertion
						(vetSaveRes.body.message).should.match('Please fill Vet name');
						
						// Handle Vet save error
						done(vetSaveErr);
					});
			});
	});

	it('should be able to update Vet instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vet
				agent.post('/api/vets')
					.send(vet)
					.expect(200)
					.end(function(vetSaveErr, vetSaveRes) {
						// Handle Vet save error
						if (vetSaveErr) done(vetSaveErr);

						// Update Vet name
						vet.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Vet
						agent.put('/api/vets/' + vetSaveRes.body._id)
							.send(vet)
							.expect(200)
							.end(function(vetUpdateErr, vetUpdateRes) {
								// Handle Vet update error
								if (vetUpdateErr) done(vetUpdateErr);

								// Set assertions
								(vetUpdateRes.body._id).should.equal(vetSaveRes.body._id);
								(vetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Vets if not signed in', function(done) {
		// Create new Vet model instance
		var vetObj = new Vet(vet);

		// Save the Vet
		vetObj.save(function() {
			// Request Vets
			request(app).get('/api/vets')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Vet if not signed in', function(done) {
		// Create new Vet model instance
		var vetObj = new Vet(vet);

		// Save the Vet
		vetObj.save(function() {
			request(app).get('/api/vets/' + vetObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', vet.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Vet instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vet
				agent.post('/api/vets')
					.send(vet)
					.expect(200)
					.end(function(vetSaveErr, vetSaveRes) {
						// Handle Vet save error
						if (vetSaveErr) done(vetSaveErr);

						// Delete existing Vet
						agent.delete('/api/vets/' + vetSaveRes.body._id)
							.send(vet)
							.expect(200)
							.end(function(vetDeleteErr, vetDeleteRes) {
								// Handle Vet error error
								if (vetDeleteErr) done(vetDeleteErr);

								// Set assertions
								(vetDeleteRes.body._id).should.equal(vetSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Vet instance if not signed in', function(done) {
		// Set Vet user 
		vet.user = user;

		// Create new Vet model instance
		var vetObj = new Vet(vet);

		// Save the Vet
		vetObj.save(function() {
			// Try deleting Vet
			request(app).delete('/api/vets/' + vetObj._id)
			.expect(403)
			.end(function(vetDeleteErr, vetDeleteRes) {
				// Set message assertion
				(vetDeleteRes.body.message).should.match('User is not authorized');

				// Handle Vet error error
				done(vetDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Vet.remove().exec(function(){
				done();
			});
		});
	});
});
