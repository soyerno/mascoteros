'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Shelter = mongoose.model('Shelter'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, shelter;

/**
 * Shelter routes tests
 */
describe('Shelter CRUD tests', function() {
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

		// Save a user to the test db and create new Shelter
		user.save(function() {
			shelter = {
				name: 'Shelter Name'
			};

			done();
		});
	});

	it('should be able to save Shelter instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shelter
				agent.post('/shelters')
					.send(shelter)
					.expect(200)
					.end(function(shelterSaveErr, shelterSaveRes) {
						// Handle Shelter save error
						if (shelterSaveErr) done(shelterSaveErr);

						// Get a list of Shelters
						agent.get('/shelters')
							.end(function(sheltersGetErr, sheltersGetRes) {
								// Handle Shelter save error
								if (sheltersGetErr) done(sheltersGetErr);

								// Get Shelters list
								var shelters = sheltersGetRes.body;

								// Set assertions
								(shelters[0].user._id).should.equal(userId);
								(shelters[0].name).should.match('Shelter Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Shelter instance if not logged in', function(done) {
		agent.post('/shelters')
			.send(shelter)
			.expect(401)
			.end(function(shelterSaveErr, shelterSaveRes) {
				// Call the assertion callback
				done(shelterSaveErr);
			});
	});

	it('should not be able to save Shelter instance if no name is provided', function(done) {
		// Invalidate name field
		shelter.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shelter
				agent.post('/shelters')
					.send(shelter)
					.expect(400)
					.end(function(shelterSaveErr, shelterSaveRes) {
						// Set message assertion
						(shelterSaveRes.body.message).should.match('Please fill Shelter name');
						
						// Handle Shelter save error
						done(shelterSaveErr);
					});
			});
	});

	it('should be able to update Shelter instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shelter
				agent.post('/shelters')
					.send(shelter)
					.expect(200)
					.end(function(shelterSaveErr, shelterSaveRes) {
						// Handle Shelter save error
						if (shelterSaveErr) done(shelterSaveErr);

						// Update Shelter name
						shelter.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Shelter
						agent.put('/shelters/' + shelterSaveRes.body._id)
							.send(shelter)
							.expect(200)
							.end(function(shelterUpdateErr, shelterUpdateRes) {
								// Handle Shelter update error
								if (shelterUpdateErr) done(shelterUpdateErr);

								// Set assertions
								(shelterUpdateRes.body._id).should.equal(shelterSaveRes.body._id);
								(shelterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Shelters if not signed in', function(done) {
		// Create new Shelter model instance
		var shelterObj = new Shelter(shelter);

		// Save the Shelter
		shelterObj.save(function() {
			// Request Shelters
			request(app).get('/shelters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Shelter if not signed in', function(done) {
		// Create new Shelter model instance
		var shelterObj = new Shelter(shelter);

		// Save the Shelter
		shelterObj.save(function() {
			request(app).get('/shelters/' + shelterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', shelter.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Shelter instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shelter
				agent.post('/shelters')
					.send(shelter)
					.expect(200)
					.end(function(shelterSaveErr, shelterSaveRes) {
						// Handle Shelter save error
						if (shelterSaveErr) done(shelterSaveErr);

						// Delete existing Shelter
						agent.delete('/shelters/' + shelterSaveRes.body._id)
							.send(shelter)
							.expect(200)
							.end(function(shelterDeleteErr, shelterDeleteRes) {
								// Handle Shelter error error
								if (shelterDeleteErr) done(shelterDeleteErr);

								// Set assertions
								(shelterDeleteRes.body._id).should.equal(shelterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Shelter instance if not signed in', function(done) {
		// Set Shelter user 
		shelter.user = user;

		// Create new Shelter model instance
		var shelterObj = new Shelter(shelter);

		// Save the Shelter
		shelterObj.save(function() {
			// Try deleting Shelter
			request(app).delete('/shelters/' + shelterObj._id)
			.expect(401)
			.end(function(shelterDeleteErr, shelterDeleteRes) {
				// Set message assertion
				(shelterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Shelter error error
				done(shelterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Shelter.remove().exec();
		done();
	});
});