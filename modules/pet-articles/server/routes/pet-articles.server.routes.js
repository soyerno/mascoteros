'use strict';

module.exports = function(app) {
	var petArticles = require('../controllers/pet-articles.server.controller');
	var petArticlesPolicy = require('../policies/pet-articles.server.policy');

	// Pet articles Routes
	app.route('/api/pet-articles').all()
		.get(petArticles.list).all(petArticlesPolicy.isAllowed)
		.post(petArticles.create);

	app.route('/api/pet-articles/:petArticleId').all(petArticlesPolicy.isAllowed)
		.get(petArticles.read)
		.put(petArticles.update)
		.delete(petArticles.delete);

	// Finish by binding the Pet article middleware
	app.param('petArticleId', petArticles.petArticleByID);
};