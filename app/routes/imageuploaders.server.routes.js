'use strict';


module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var imageuploaders = require('../../app/controllers/imageuploaders.server.controller');
  var multipart = require('connect-multiparty')();

	// Imageuploaders Routes
	app.route('/imageuploaders')
		.get(imageuploaders.list)
		.post(users.requiresLogin, imageuploaders.create);

	app.route('/imageuploaders/:imageuploaderId')
		.get(imageuploaders.read)
		.put(users.requiresLogin, imageuploaders.hasAuthorization, imageuploaders.update)
		.delete(users.requiresLogin, imageuploaders.hasAuthorization, imageuploaders.delete);

	// Finish by binding the Imageuploader middleware
	app.param('imageuploaderId', imageuploaders.imageuploaderByID);

  app.route('/api/upload').post(
    users.requiresLogin,
    multipart,
    imageuploaders.upload);
};
