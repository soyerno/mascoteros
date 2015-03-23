'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Rescue = mongoose.model('Rescue'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rescue;

/**
 * Rescue routes tests
 */
describe('Rescue CRUD tests', function() {
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

		// Save a user to the test db and create new Rescue
		user.save(function() {
			rescue = {
				name: 'Rescue Name'
			};

			done();
		});
	});

	it('should be able to save Rescue instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rescue
				agent.post('/rescues')
					.send(rescue)
					.expect(200)
					.end(function(rescueSaveErr, rescueSaveRes) {
						// Handle Rescue save error
						if (rescueSaveErr) done(rescueSaveErr);

						// Get a list of Rescues
						agent.get('/rescues')
							.end(function(rescuesGetErr, rescuesGetRes) {
								// Handle Rescue save error
								if (rescuesGetErr) done(rescuesGetErr);

								// Get Rescues list
								var rescues = rescuesGetRes.body;

								// Set assertions
								(rescues[0].user._id).should.equal(userId);
								(rescues[0].name).should.match('Rescue Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Rescue instance if not logged in', function(done) {
		agent.post('/rescues')
			.send(rescue)
			.expect(401)
			.end(function(rescueSaveErr, rescueSaveRes) {
				// Call the assertion callback
				done(rescueSaveErr);
			});
	});

	it('should not be able to save Rescue instance if no name is provided', function(done) {
		// Invalidate name field
		rescue.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rescue
				agent.post('/rescues')
					.send(rescue)
					.expect(400)
					.end(function(rescueSaveErr, rescueSaveRes) {
						// Set message assertion
						(rescueSaveRes.body.message).should.match('Please fill Rescue name');
						
						// Handle Rescue save error
						done(rescueSaveErr);
					});
			});
	});

	it('should be able to update Rescue instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rescue
				agent.post('/rescues')
					.send(rescue)
					.expect(200)
					.end(function(rescueSaveErr, rescueSaveRes) {
						// Handle Rescue save error
						if (rescueSaveErr) done(rescueSaveErr);

						// Update Rescue name
						rescue.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Rescue
						agent.put('/rescues/' + rescueSaveRes.body._id)
							.send(rescue)
							.expect(200)
							.end(function(rescueUpdateErr, rescueUpdateRes) {
								// Handle Rescue update error
								if (rescueUpdateErr) done(rescueUpdateErr);

								// Set assertions
								(rescueUpdateRes.body._id).should.equal(rescueSaveRes.body._id);
								(rescueUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Rescues if not signed in', function(done) {
		// Create new Rescue model instance
		var rescueObj = new Rescue(rescue);

		// Save the Rescue
		rescueObj.save(function() {
			// Request Rescues
			request(app).get('/rescues')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Rescue if not signed in', function(done) {
		// Create new Rescue model instance
		var rescueObj = new Rescue(rescue);

		// Save the Rescue
		rescueObj.save(function() {
			request(app).get('/rescues/' + rescueObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rescue.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Rescue instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rescue
				agent.post('/rescues')
					.send(rescue)
					.expect(200)
					.end(function(rescueSaveErr, rescueSaveRes) {
						// Handle Rescue save error
						if (rescueSaveErr) done(rescueSaveErr);

						// Delete existing Rescue
						agent.delete('/rescues/' + rescueSaveRes.body._id)
							.send(rescue)
							.expect(200)
							.end(function(rescueDeleteErr, rescueDeleteRes) {
								// Handle Rescue error error
								if (rescueDeleteErr) done(rescueDeleteErr);

								// Set assertions
								(rescueDeleteRes.body._id).should.equal(rescueSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Rescue instance if not signed in', function(done) {
		// Set Rescue user 
		rescue.user = user;

		// Create new Rescue model instance
		var rescueObj = new Rescue(rescue);

		// Save the Rescue
		rescueObj.save(function() {
			// Try deleting Rescue
			request(app).delete('/rescues/' + rescueObj._id)
			.expect(401)
			.end(function(rescueDeleteErr, rescueDeleteRes) {
				// Set message assertion
				(rescueDeleteRes.body.message).should.match('User is not logged in');

				// Handle Rescue error error
				done(rescueDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Rescue.remove().exec();
		done();
	});
});