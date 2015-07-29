'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ride = mongoose.model('Ride'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, ride;

/**
 * Ride routes tests
 */
describe('Ride CRUD tests', function() {
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

		// Save a user to the test db and create new Ride
		user.save(function() {
			ride = {
				name: 'Ride Name'
			};

			done();
		});
	});

	it('should be able to save Ride instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ride
				agent.post('/api/rides')
					.send(ride)
					.expect(200)
					.end(function(rideSaveErr, rideSaveRes) {
						// Handle Ride save error
						if (rideSaveErr) done(rideSaveErr);

						// Get a list of Rides
						agent.get('/api/rides')
							.end(function(ridesGetErr, ridesGetRes) {
								// Handle Ride save error
								if (ridesGetErr) done(ridesGetErr);

								// Get Rides list
								var rides = ridesGetRes.body;

								// Set assertions
								(rides[0].user._id).should.equal(userId);
								(rides[0].name).should.match('Ride Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ride instance if not logged in', function(done) {
		agent.post('/api/rides')
			.send(ride)
			.expect(403)
			.end(function(rideSaveErr, rideSaveRes) {
				// Call the assertion callback
				done(rideSaveErr);
			});
	});

	it('should not be able to save Ride instance if no name is provided', function(done) {
		// Invalidate name field
		ride.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ride
				agent.post('/api/rides')
					.send(ride)
					.expect(400)
					.end(function(rideSaveErr, rideSaveRes) {
						// Set message assertion
						(rideSaveRes.body.message).should.match('Please fill Ride name');
						
						// Handle Ride save error
						done(rideSaveErr);
					});
			});
	});

	it('should be able to update Ride instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ride
				agent.post('/api/rides')
					.send(ride)
					.expect(200)
					.end(function(rideSaveErr, rideSaveRes) {
						// Handle Ride save error
						if (rideSaveErr) done(rideSaveErr);

						// Update Ride name
						ride.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ride
						agent.put('/api/rides/' + rideSaveRes.body._id)
							.send(ride)
							.expect(200)
							.end(function(rideUpdateErr, rideUpdateRes) {
								// Handle Ride update error
								if (rideUpdateErr) done(rideUpdateErr);

								// Set assertions
								(rideUpdateRes.body._id).should.equal(rideSaveRes.body._id);
								(rideUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Rides if not signed in', function(done) {
		// Create new Ride model instance
		var rideObj = new Ride(ride);

		// Save the Ride
		rideObj.save(function() {
			// Request Rides
			request(app).get('/api/rides')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ride if not signed in', function(done) {
		// Create new Ride model instance
		var rideObj = new Ride(ride);

		// Save the Ride
		rideObj.save(function() {
			request(app).get('/api/rides/' + rideObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ride.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ride instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ride
				agent.post('/api/rides')
					.send(ride)
					.expect(200)
					.end(function(rideSaveErr, rideSaveRes) {
						// Handle Ride save error
						if (rideSaveErr) done(rideSaveErr);

						// Delete existing Ride
						agent.delete('/api/rides/' + rideSaveRes.body._id)
							.send(ride)
							.expect(200)
							.end(function(rideDeleteErr, rideDeleteRes) {
								// Handle Ride error error
								if (rideDeleteErr) done(rideDeleteErr);

								// Set assertions
								(rideDeleteRes.body._id).should.equal(rideSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ride instance if not signed in', function(done) {
		// Set Ride user 
		ride.user = user;

		// Create new Ride model instance
		var rideObj = new Ride(ride);

		// Save the Ride
		rideObj.save(function() {
			// Try deleting Ride
			request(app).delete('/api/rides/' + rideObj._id)
			.expect(403)
			.end(function(rideDeleteErr, rideDeleteRes) {
				// Set message assertion
				(rideDeleteRes.body.message).should.match('User is not authorized');

				// Handle Ride error error
				done(rideDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Ride.remove().exec(function(){
				done();
			});
		});
	});
});
