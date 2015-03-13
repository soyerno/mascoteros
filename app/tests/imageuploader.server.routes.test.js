'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Imageuploader = mongoose.model('Imageuploader'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, imageuploader;

/**
 * Imageuploader routes tests
 */
describe('Imageuploader CRUD tests', function() {
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

		// Save a user to the test db and create new Imageuploader
		user.save(function() {
			imageuploader = {
				name: 'Imageuploader Name'
			};

			done();
		});
	});

	it('should be able to save Imageuploader instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Imageuploader
				agent.post('/imageuploaders')
					.send(imageuploader)
					.expect(200)
					.end(function(imageuploaderSaveErr, imageuploaderSaveRes) {
						// Handle Imageuploader save error
						if (imageuploaderSaveErr) done(imageuploaderSaveErr);

						// Get a list of Imageuploaders
						agent.get('/imageuploaders')
							.end(function(imageuploadersGetErr, imageuploadersGetRes) {
								// Handle Imageuploader save error
								if (imageuploadersGetErr) done(imageuploadersGetErr);

								// Get Imageuploaders list
								var imageuploaders = imageuploadersGetRes.body;

								// Set assertions
								(imageuploaders[0].user._id).should.equal(userId);
								(imageuploaders[0].name).should.match('Imageuploader Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Imageuploader instance if not logged in', function(done) {
		agent.post('/imageuploaders')
			.send(imageuploader)
			.expect(401)
			.end(function(imageuploaderSaveErr, imageuploaderSaveRes) {
				// Call the assertion callback
				done(imageuploaderSaveErr);
			});
	});

	it('should not be able to save Imageuploader instance if no name is provided', function(done) {
		// Invalidate name field
		imageuploader.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Imageuploader
				agent.post('/imageuploaders')
					.send(imageuploader)
					.expect(400)
					.end(function(imageuploaderSaveErr, imageuploaderSaveRes) {
						// Set message assertion
						(imageuploaderSaveRes.body.message).should.match('Please fill Imageuploader name');
						
						// Handle Imageuploader save error
						done(imageuploaderSaveErr);
					});
			});
	});

	it('should be able to update Imageuploader instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Imageuploader
				agent.post('/imageuploaders')
					.send(imageuploader)
					.expect(200)
					.end(function(imageuploaderSaveErr, imageuploaderSaveRes) {
						// Handle Imageuploader save error
						if (imageuploaderSaveErr) done(imageuploaderSaveErr);

						// Update Imageuploader name
						imageuploader.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Imageuploader
						agent.put('/imageuploaders/' + imageuploaderSaveRes.body._id)
							.send(imageuploader)
							.expect(200)
							.end(function(imageuploaderUpdateErr, imageuploaderUpdateRes) {
								// Handle Imageuploader update error
								if (imageuploaderUpdateErr) done(imageuploaderUpdateErr);

								// Set assertions
								(imageuploaderUpdateRes.body._id).should.equal(imageuploaderSaveRes.body._id);
								(imageuploaderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Imageuploaders if not signed in', function(done) {
		// Create new Imageuploader model instance
		var imageuploaderObj = new Imageuploader(imageuploader);

		// Save the Imageuploader
		imageuploaderObj.save(function() {
			// Request Imageuploaders
			request(app).get('/imageuploaders')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Imageuploader if not signed in', function(done) {
		// Create new Imageuploader model instance
		var imageuploaderObj = new Imageuploader(imageuploader);

		// Save the Imageuploader
		imageuploaderObj.save(function() {
			request(app).get('/imageuploaders/' + imageuploaderObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', imageuploader.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Imageuploader instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Imageuploader
				agent.post('/imageuploaders')
					.send(imageuploader)
					.expect(200)
					.end(function(imageuploaderSaveErr, imageuploaderSaveRes) {
						// Handle Imageuploader save error
						if (imageuploaderSaveErr) done(imageuploaderSaveErr);

						// Delete existing Imageuploader
						agent.delete('/imageuploaders/' + imageuploaderSaveRes.body._id)
							.send(imageuploader)
							.expect(200)
							.end(function(imageuploaderDeleteErr, imageuploaderDeleteRes) {
								// Handle Imageuploader error error
								if (imageuploaderDeleteErr) done(imageuploaderDeleteErr);

								// Set assertions
								(imageuploaderDeleteRes.body._id).should.equal(imageuploaderSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Imageuploader instance if not signed in', function(done) {
		// Set Imageuploader user 
		imageuploader.user = user;

		// Create new Imageuploader model instance
		var imageuploaderObj = new Imageuploader(imageuploader);

		// Save the Imageuploader
		imageuploaderObj.save(function() {
			// Try deleting Imageuploader
			request(app).delete('/imageuploaders/' + imageuploaderObj._id)
			.expect(401)
			.end(function(imageuploaderDeleteErr, imageuploaderDeleteRes) {
				// Set message assertion
				(imageuploaderDeleteRes.body.message).should.match('User is not logged in');

				// Handle Imageuploader error error
				done(imageuploaderDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Imageuploader.remove().exec();
		done();
	});
});