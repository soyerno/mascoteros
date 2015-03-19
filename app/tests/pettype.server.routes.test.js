'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pettype = mongoose.model('Pettype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pettype;

/**
 * Pettype routes tests
 */
describe('Pettype CRUD tests', function() {
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

		// Save a user to the test db and create new Pettype
		user.save(function() {
			pettype = {
				name: 'Pettype Name'
			};

			done();
		});
	});

	it('should be able to save Pettype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pettype
				agent.post('/pettypes')
					.send(pettype)
					.expect(200)
					.end(function(pettypeSaveErr, pettypeSaveRes) {
						// Handle Pettype save error
						if (pettypeSaveErr) done(pettypeSaveErr);

						// Get a list of Pettypes
						agent.get('/pettypes')
							.end(function(pettypesGetErr, pettypesGetRes) {
								// Handle Pettype save error
								if (pettypesGetErr) done(pettypesGetErr);

								// Get Pettypes list
								var pettypes = pettypesGetRes.body;

								// Set assertions
								(pettypes[0].user._id).should.equal(userId);
								(pettypes[0].name).should.match('Pettype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pettype instance if not logged in', function(done) {
		agent.post('/pettypes')
			.send(pettype)
			.expect(401)
			.end(function(pettypeSaveErr, pettypeSaveRes) {
				// Call the assertion callback
				done(pettypeSaveErr);
			});
	});

	it('should not be able to save Pettype instance if no name is provided', function(done) {
		// Invalidate name field
		pettype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pettype
				agent.post('/pettypes')
					.send(pettype)
					.expect(400)
					.end(function(pettypeSaveErr, pettypeSaveRes) {
						// Set message assertion
						(pettypeSaveRes.body.message).should.match('Please fill Pettype name');
						
						// Handle Pettype save error
						done(pettypeSaveErr);
					});
			});
	});

	it('should be able to update Pettype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pettype
				agent.post('/pettypes')
					.send(pettype)
					.expect(200)
					.end(function(pettypeSaveErr, pettypeSaveRes) {
						// Handle Pettype save error
						if (pettypeSaveErr) done(pettypeSaveErr);

						// Update Pettype name
						pettype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pettype
						agent.put('/pettypes/' + pettypeSaveRes.body._id)
							.send(pettype)
							.expect(200)
							.end(function(pettypeUpdateErr, pettypeUpdateRes) {
								// Handle Pettype update error
								if (pettypeUpdateErr) done(pettypeUpdateErr);

								// Set assertions
								(pettypeUpdateRes.body._id).should.equal(pettypeSaveRes.body._id);
								(pettypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pettypes if not signed in', function(done) {
		// Create new Pettype model instance
		var pettypeObj = new Pettype(pettype);

		// Save the Pettype
		pettypeObj.save(function() {
			// Request Pettypes
			request(app).get('/pettypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pettype if not signed in', function(done) {
		// Create new Pettype model instance
		var pettypeObj = new Pettype(pettype);

		// Save the Pettype
		pettypeObj.save(function() {
			request(app).get('/pettypes/' + pettypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pettype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pettype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pettype
				agent.post('/pettypes')
					.send(pettype)
					.expect(200)
					.end(function(pettypeSaveErr, pettypeSaveRes) {
						// Handle Pettype save error
						if (pettypeSaveErr) done(pettypeSaveErr);

						// Delete existing Pettype
						agent.delete('/pettypes/' + pettypeSaveRes.body._id)
							.send(pettype)
							.expect(200)
							.end(function(pettypeDeleteErr, pettypeDeleteRes) {
								// Handle Pettype error error
								if (pettypeDeleteErr) done(pettypeDeleteErr);

								// Set assertions
								(pettypeDeleteRes.body._id).should.equal(pettypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pettype instance if not signed in', function(done) {
		// Set Pettype user 
		pettype.user = user;

		// Create new Pettype model instance
		var pettypeObj = new Pettype(pettype);

		// Save the Pettype
		pettypeObj.save(function() {
			// Try deleting Pettype
			request(app).delete('/pettypes/' + pettypeObj._id)
			.expect(401)
			.end(function(pettypeDeleteErr, pettypeDeleteRes) {
				// Set message assertion
				(pettypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pettype error error
				done(pettypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pettype.remove().exec();
		done();
	});
});