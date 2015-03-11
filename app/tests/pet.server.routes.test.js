'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pet = mongoose.model('Pet'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pet;

/**
 * Pet routes tests
 */
describe('Pet CRUD tests', function() {
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

		// Save a user to the test db and create new Pet
		user.save(function() {
			pet = {
				name: 'Pet Name'
			};

			done();
		});
	});

	it('should be able to save Pet instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet
				agent.post('/pets')
					.send(pet)
					.expect(200)
					.end(function(petSaveErr, petSaveRes) {
						// Handle Pet save error
						if (petSaveErr) done(petSaveErr);

						// Get a list of Pets
						agent.get('/pets')
							.end(function(petsGetErr, petsGetRes) {
								// Handle Pet save error
								if (petsGetErr) done(petsGetErr);

								// Get Pets list
								var pets = petsGetRes.body;

								// Set assertions
								(pets[0].user._id).should.equal(userId);
								(pets[0].name).should.match('Pet Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pet instance if not logged in', function(done) {
		agent.post('/pets')
			.send(pet)
			.expect(401)
			.end(function(petSaveErr, petSaveRes) {
				// Call the assertion callback
				done(petSaveErr);
			});
	});

	it('should not be able to save Pet instance if no name is provided', function(done) {
		// Invalidate name field
		pet.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet
				agent.post('/pets')
					.send(pet)
					.expect(400)
					.end(function(petSaveErr, petSaveRes) {
						// Set message assertion
						(petSaveRes.body.message).should.match('Please fill Pet name');
						
						// Handle Pet save error
						done(petSaveErr);
					});
			});
	});

	it('should be able to update Pet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet
				agent.post('/pets')
					.send(pet)
					.expect(200)
					.end(function(petSaveErr, petSaveRes) {
						// Handle Pet save error
						if (petSaveErr) done(petSaveErr);

						// Update Pet name
						pet.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pet
						agent.put('/pets/' + petSaveRes.body._id)
							.send(pet)
							.expect(200)
							.end(function(petUpdateErr, petUpdateRes) {
								// Handle Pet update error
								if (petUpdateErr) done(petUpdateErr);

								// Set assertions
								(petUpdateRes.body._id).should.equal(petSaveRes.body._id);
								(petUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pets if not signed in', function(done) {
		// Create new Pet model instance
		var petObj = new Pet(pet);

		// Save the Pet
		petObj.save(function() {
			// Request Pets
			request(app).get('/pets')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pet if not signed in', function(done) {
		// Create new Pet model instance
		var petObj = new Pet(pet);

		// Save the Pet
		petObj.save(function() {
			request(app).get('/pets/' + petObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pet.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pet
				agent.post('/pets')
					.send(pet)
					.expect(200)
					.end(function(petSaveErr, petSaveRes) {
						// Handle Pet save error
						if (petSaveErr) done(petSaveErr);

						// Delete existing Pet
						agent.delete('/pets/' + petSaveRes.body._id)
							.send(pet)
							.expect(200)
							.end(function(petDeleteErr, petDeleteRes) {
								// Handle Pet error error
								if (petDeleteErr) done(petDeleteErr);

								// Set assertions
								(petDeleteRes.body._id).should.equal(petSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pet instance if not signed in', function(done) {
		// Set Pet user 
		pet.user = user;

		// Create new Pet model instance
		var petObj = new Pet(pet);

		// Save the Pet
		petObj.save(function() {
			// Try deleting Pet
			request(app).delete('/pets/' + petObj._id)
			.expect(401)
			.end(function(petDeleteErr, petDeleteRes) {
				// Set message assertion
				(petDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pet error error
				done(petDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pet.remove().exec();
		done();
	});
});