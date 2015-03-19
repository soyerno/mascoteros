'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Petgenre = mongoose.model('Petgenre'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, petgenre;

/**
 * Petgenre routes tests
 */
describe('Petgenre CRUD tests', function() {
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

		// Save a user to the test db and create new Petgenre
		user.save(function() {
			petgenre = {
				name: 'Petgenre Name'
			};

			done();
		});
	});

	it('should be able to save Petgenre instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petgenre
				agent.post('/petgenres')
					.send(petgenre)
					.expect(200)
					.end(function(petgenreSaveErr, petgenreSaveRes) {
						// Handle Petgenre save error
						if (petgenreSaveErr) done(petgenreSaveErr);

						// Get a list of Petgenres
						agent.get('/petgenres')
							.end(function(petgenresGetErr, petgenresGetRes) {
								// Handle Petgenre save error
								if (petgenresGetErr) done(petgenresGetErr);

								// Get Petgenres list
								var petgenres = petgenresGetRes.body;

								// Set assertions
								(petgenres[0].user._id).should.equal(userId);
								(petgenres[0].name).should.match('Petgenre Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Petgenre instance if not logged in', function(done) {
		agent.post('/petgenres')
			.send(petgenre)
			.expect(401)
			.end(function(petgenreSaveErr, petgenreSaveRes) {
				// Call the assertion callback
				done(petgenreSaveErr);
			});
	});

	it('should not be able to save Petgenre instance if no name is provided', function(done) {
		// Invalidate name field
		petgenre.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petgenre
				agent.post('/petgenres')
					.send(petgenre)
					.expect(400)
					.end(function(petgenreSaveErr, petgenreSaveRes) {
						// Set message assertion
						(petgenreSaveRes.body.message).should.match('Please fill Petgenre name');
						
						// Handle Petgenre save error
						done(petgenreSaveErr);
					});
			});
	});

	it('should be able to update Petgenre instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petgenre
				agent.post('/petgenres')
					.send(petgenre)
					.expect(200)
					.end(function(petgenreSaveErr, petgenreSaveRes) {
						// Handle Petgenre save error
						if (petgenreSaveErr) done(petgenreSaveErr);

						// Update Petgenre name
						petgenre.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Petgenre
						agent.put('/petgenres/' + petgenreSaveRes.body._id)
							.send(petgenre)
							.expect(200)
							.end(function(petgenreUpdateErr, petgenreUpdateRes) {
								// Handle Petgenre update error
								if (petgenreUpdateErr) done(petgenreUpdateErr);

								// Set assertions
								(petgenreUpdateRes.body._id).should.equal(petgenreSaveRes.body._id);
								(petgenreUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Petgenres if not signed in', function(done) {
		// Create new Petgenre model instance
		var petgenreObj = new Petgenre(petgenre);

		// Save the Petgenre
		petgenreObj.save(function() {
			// Request Petgenres
			request(app).get('/petgenres')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Petgenre if not signed in', function(done) {
		// Create new Petgenre model instance
		var petgenreObj = new Petgenre(petgenre);

		// Save the Petgenre
		petgenreObj.save(function() {
			request(app).get('/petgenres/' + petgenreObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', petgenre.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Petgenre instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Petgenre
				agent.post('/petgenres')
					.send(petgenre)
					.expect(200)
					.end(function(petgenreSaveErr, petgenreSaveRes) {
						// Handle Petgenre save error
						if (petgenreSaveErr) done(petgenreSaveErr);

						// Delete existing Petgenre
						agent.delete('/petgenres/' + petgenreSaveRes.body._id)
							.send(petgenre)
							.expect(200)
							.end(function(petgenreDeleteErr, petgenreDeleteRes) {
								// Handle Petgenre error error
								if (petgenreDeleteErr) done(petgenreDeleteErr);

								// Set assertions
								(petgenreDeleteRes.body._id).should.equal(petgenreSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Petgenre instance if not signed in', function(done) {
		// Set Petgenre user 
		petgenre.user = user;

		// Create new Petgenre model instance
		var petgenreObj = new Petgenre(petgenre);

		// Save the Petgenre
		petgenreObj.save(function() {
			// Try deleting Petgenre
			request(app).delete('/petgenres/' + petgenreObj._id)
			.expect(401)
			.end(function(petgenreDeleteErr, petgenreDeleteRes) {
				// Set message assertion
				(petgenreDeleteRes.body.message).should.match('User is not logged in');

				// Handle Petgenre error error
				done(petgenreDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Petgenre.remove().exec();
		done();
	});
});