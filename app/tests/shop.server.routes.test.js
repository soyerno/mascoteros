'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Shop = mongoose.model('Shop'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, shop;

/**
 * Shop routes tests
 */
describe('Shop CRUD tests', function() {
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

		// Save a user to the test db and create new Shop
		user.save(function() {
			shop = {
				name: 'Shop Name'
			};

			done();
		});
	});

	it('should be able to save Shop instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shop
				agent.post('/shops')
					.send(shop)
					.expect(200)
					.end(function(shopSaveErr, shopSaveRes) {
						// Handle Shop save error
						if (shopSaveErr) done(shopSaveErr);

						// Get a list of Shops
						agent.get('/shops')
							.end(function(shopsGetErr, shopsGetRes) {
								// Handle Shop save error
								if (shopsGetErr) done(shopsGetErr);

								// Get Shops list
								var shops = shopsGetRes.body;

								// Set assertions
								(shops[0].user._id).should.equal(userId);
								(shops[0].name).should.match('Shop Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Shop instance if not logged in', function(done) {
		agent.post('/shops')
			.send(shop)
			.expect(401)
			.end(function(shopSaveErr, shopSaveRes) {
				// Call the assertion callback
				done(shopSaveErr);
			});
	});

	it('should not be able to save Shop instance if no name is provided', function(done) {
		// Invalidate name field
		shop.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shop
				agent.post('/shops')
					.send(shop)
					.expect(400)
					.end(function(shopSaveErr, shopSaveRes) {
						// Set message assertion
						(shopSaveRes.body.message).should.match('Please fill Shop name');
						
						// Handle Shop save error
						done(shopSaveErr);
					});
			});
	});

	it('should be able to update Shop instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shop
				agent.post('/shops')
					.send(shop)
					.expect(200)
					.end(function(shopSaveErr, shopSaveRes) {
						// Handle Shop save error
						if (shopSaveErr) done(shopSaveErr);

						// Update Shop name
						shop.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Shop
						agent.put('/shops/' + shopSaveRes.body._id)
							.send(shop)
							.expect(200)
							.end(function(shopUpdateErr, shopUpdateRes) {
								// Handle Shop update error
								if (shopUpdateErr) done(shopUpdateErr);

								// Set assertions
								(shopUpdateRes.body._id).should.equal(shopSaveRes.body._id);
								(shopUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Shops if not signed in', function(done) {
		// Create new Shop model instance
		var shopObj = new Shop(shop);

		// Save the Shop
		shopObj.save(function() {
			// Request Shops
			request(app).get('/shops')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Shop if not signed in', function(done) {
		// Create new Shop model instance
		var shopObj = new Shop(shop);

		// Save the Shop
		shopObj.save(function() {
			request(app).get('/shops/' + shopObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', shop.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Shop instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shop
				agent.post('/shops')
					.send(shop)
					.expect(200)
					.end(function(shopSaveErr, shopSaveRes) {
						// Handle Shop save error
						if (shopSaveErr) done(shopSaveErr);

						// Delete existing Shop
						agent.delete('/shops/' + shopSaveRes.body._id)
							.send(shop)
							.expect(200)
							.end(function(shopDeleteErr, shopDeleteRes) {
								// Handle Shop error error
								if (shopDeleteErr) done(shopDeleteErr);

								// Set assertions
								(shopDeleteRes.body._id).should.equal(shopSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Shop instance if not signed in', function(done) {
		// Set Shop user 
		shop.user = user;

		// Create new Shop model instance
		var shopObj = new Shop(shop);

		// Save the Shop
		shopObj.save(function() {
			// Try deleting Shop
			request(app).delete('/shops/' + shopObj._id)
			.expect(401)
			.end(function(shopDeleteErr, shopDeleteRes) {
				// Set message assertion
				(shopDeleteRes.body.message).should.match('User is not logged in');

				// Handle Shop error error
				done(shopDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Shop.remove().exec();
		done();
	});
});