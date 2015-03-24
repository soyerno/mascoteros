'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var faqs = require('../../app/controllers/faqs.server.controller');

	// Faqs Routes
	app.route('/faqs')
		.get(faqs.list)
		.post(users.requiresLogin, faqs.create);

	app.route('/faqs/:faqId')
		.get(faqs.read)
		.put(users.requiresLogin, faqs.hasAuthorization, faqs.update)
		.delete(users.requiresLogin, faqs.hasAuthorization, faqs.delete);

	// Finish by binding the Faq middleware
	app.param('faqId', faqs.faqByID);
};
