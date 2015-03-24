'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Faq = mongoose.model('Faq'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, faq;

/**
 * Faq routes tests
 */
describe('Faq CRUD tests', function() {
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

		// Save a user to the test db and create new Faq
		user.save(function() {
			faq = {
				name: 'Faq Name'
			};

			done();
		});
	});

	it('should be able to save Faq instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faq
				agent.post('/faqs')
					.send(faq)
					.expect(200)
					.end(function(faqSaveErr, faqSaveRes) {
						// Handle Faq save error
						if (faqSaveErr) done(faqSaveErr);

						// Get a list of Faqs
						agent.get('/faqs')
							.end(function(faqsGetErr, faqsGetRes) {
								// Handle Faq save error
								if (faqsGetErr) done(faqsGetErr);

								// Get Faqs list
								var faqs = faqsGetRes.body;

								// Set assertions
								(faqs[0].user._id).should.equal(userId);
								(faqs[0].name).should.match('Faq Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Faq instance if not logged in', function(done) {
		agent.post('/faqs')
			.send(faq)
			.expect(401)
			.end(function(faqSaveErr, faqSaveRes) {
				// Call the assertion callback
				done(faqSaveErr);
			});
	});

	it('should not be able to save Faq instance if no name is provided', function(done) {
		// Invalidate name field
		faq.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faq
				agent.post('/faqs')
					.send(faq)
					.expect(400)
					.end(function(faqSaveErr, faqSaveRes) {
						// Set message assertion
						(faqSaveRes.body.message).should.match('Please fill Faq name');
						
						// Handle Faq save error
						done(faqSaveErr);
					});
			});
	});

	it('should be able to update Faq instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faq
				agent.post('/faqs')
					.send(faq)
					.expect(200)
					.end(function(faqSaveErr, faqSaveRes) {
						// Handle Faq save error
						if (faqSaveErr) done(faqSaveErr);

						// Update Faq name
						faq.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Faq
						agent.put('/faqs/' + faqSaveRes.body._id)
							.send(faq)
							.expect(200)
							.end(function(faqUpdateErr, faqUpdateRes) {
								// Handle Faq update error
								if (faqUpdateErr) done(faqUpdateErr);

								// Set assertions
								(faqUpdateRes.body._id).should.equal(faqSaveRes.body._id);
								(faqUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Faqs if not signed in', function(done) {
		// Create new Faq model instance
		var faqObj = new Faq(faq);

		// Save the Faq
		faqObj.save(function() {
			// Request Faqs
			request(app).get('/faqs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Faq if not signed in', function(done) {
		// Create new Faq model instance
		var faqObj = new Faq(faq);

		// Save the Faq
		faqObj.save(function() {
			request(app).get('/faqs/' + faqObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', faq.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Faq instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faq
				agent.post('/faqs')
					.send(faq)
					.expect(200)
					.end(function(faqSaveErr, faqSaveRes) {
						// Handle Faq save error
						if (faqSaveErr) done(faqSaveErr);

						// Delete existing Faq
						agent.delete('/faqs/' + faqSaveRes.body._id)
							.send(faq)
							.expect(200)
							.end(function(faqDeleteErr, faqDeleteRes) {
								// Handle Faq error error
								if (faqDeleteErr) done(faqDeleteErr);

								// Set assertions
								(faqDeleteRes.body._id).should.equal(faqSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Faq instance if not signed in', function(done) {
		// Set Faq user 
		faq.user = user;

		// Create new Faq model instance
		var faqObj = new Faq(faq);

		// Save the Faq
		faqObj.save(function() {
			// Try deleting Faq
			request(app).delete('/faqs/' + faqObj._id)
			.expect(401)
			.end(function(faqDeleteErr, faqDeleteRes) {
				// Set message assertion
				(faqDeleteRes.body.message).should.match('User is not logged in');

				// Handle Faq error error
				done(faqDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Faq.remove().exec();
		done();
	});
});