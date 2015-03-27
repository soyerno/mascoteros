'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Trainer = mongoose.model('Trainer'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, trainer;

/**
 * Trainer routes tests
 */
describe('Trainer CRUD tests', function() {
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

		// Save a user to the test db and create new Trainer
		user.save(function() {
			trainer = {
				name: 'Trainer Name'
			};

			done();
		});
	});

	it('should be able to save Trainer instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trainer
				agent.post('/trainers')
					.send(trainer)
					.expect(200)
					.end(function(trainerSaveErr, trainerSaveRes) {
						// Handle Trainer save error
						if (trainerSaveErr) done(trainerSaveErr);

						// Get a list of Trainers
						agent.get('/trainers')
							.end(function(trainersGetErr, trainersGetRes) {
								// Handle Trainer save error
								if (trainersGetErr) done(trainersGetErr);

								// Get Trainers list
								var trainers = trainersGetRes.body;

								// Set assertions
								(trainers[0].user._id).should.equal(userId);
								(trainers[0].name).should.match('Trainer Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Trainer instance if not logged in', function(done) {
		agent.post('/trainers')
			.send(trainer)
			.expect(401)
			.end(function(trainerSaveErr, trainerSaveRes) {
				// Call the assertion callback
				done(trainerSaveErr);
			});
	});

	it('should not be able to save Trainer instance if no name is provided', function(done) {
		// Invalidate name field
		trainer.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trainer
				agent.post('/trainers')
					.send(trainer)
					.expect(400)
					.end(function(trainerSaveErr, trainerSaveRes) {
						// Set message assertion
						(trainerSaveRes.body.message).should.match('Please fill Trainer name');
						
						// Handle Trainer save error
						done(trainerSaveErr);
					});
			});
	});

	it('should be able to update Trainer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trainer
				agent.post('/trainers')
					.send(trainer)
					.expect(200)
					.end(function(trainerSaveErr, trainerSaveRes) {
						// Handle Trainer save error
						if (trainerSaveErr) done(trainerSaveErr);

						// Update Trainer name
						trainer.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Trainer
						agent.put('/trainers/' + trainerSaveRes.body._id)
							.send(trainer)
							.expect(200)
							.end(function(trainerUpdateErr, trainerUpdateRes) {
								// Handle Trainer update error
								if (trainerUpdateErr) done(trainerUpdateErr);

								// Set assertions
								(trainerUpdateRes.body._id).should.equal(trainerSaveRes.body._id);
								(trainerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Trainers if not signed in', function(done) {
		// Create new Trainer model instance
		var trainerObj = new Trainer(trainer);

		// Save the Trainer
		trainerObj.save(function() {
			// Request Trainers
			request(app).get('/trainers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Trainer if not signed in', function(done) {
		// Create new Trainer model instance
		var trainerObj = new Trainer(trainer);

		// Save the Trainer
		trainerObj.save(function() {
			request(app).get('/trainers/' + trainerObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', trainer.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Trainer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Trainer
				agent.post('/trainers')
					.send(trainer)
					.expect(200)
					.end(function(trainerSaveErr, trainerSaveRes) {
						// Handle Trainer save error
						if (trainerSaveErr) done(trainerSaveErr);

						// Delete existing Trainer
						agent.delete('/trainers/' + trainerSaveRes.body._id)
							.send(trainer)
							.expect(200)
							.end(function(trainerDeleteErr, trainerDeleteRes) {
								// Handle Trainer error error
								if (trainerDeleteErr) done(trainerDeleteErr);

								// Set assertions
								(trainerDeleteRes.body._id).should.equal(trainerSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Trainer instance if not signed in', function(done) {
		// Set Trainer user 
		trainer.user = user;

		// Create new Trainer model instance
		var trainerObj = new Trainer(trainer);

		// Save the Trainer
		trainerObj.save(function() {
			// Try deleting Trainer
			request(app).delete('/trainers/' + trainerObj._id)
			.expect(401)
			.end(function(trainerDeleteErr, trainerDeleteRes) {
				// Set message assertion
				(trainerDeleteRes.body.message).should.match('User is not logged in');

				// Handle Trainer error error
				done(trainerDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Trainer.remove().exec();
		done();
	});
});