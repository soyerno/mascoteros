'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Pets Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/pets',
			permissions: '*'
		}, {
			resources: '/api/pets/:petId',
			permissions: '*'
		}, {
			resources: '/api/petgenres',
			permissions: '*'
		}, {
			resources: '/api/petgenres/:petId',
			permissions: '*'
		}, {
			resources: '/api/pettypes/:petId',
			permissions: '*'
		}, {
			resources: '/api/pettypes/:petId',
			permissions: '*'
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/pets',
			permissions: ['get', 'post']
		}, {
			resources: '/api/pets/:petId',
			permissions: ['get']
		},{
			resources: '/api/petgenres',
			permissions: ['get']
		}, {
			resources: '/api/petgenres/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:petId',
			permissions: ['get']
		}]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/pets',
			permissions: ['get']
		}, {
			resources: '/api/pets/:petId',
			permissions: ['get']
		}, {
			resources: '/api/petgenres',
			permissions: ['get']
		}, {
			resources: '/api/petgenres/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:petId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If Pets Policy Allows
 */
exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// If an pet is being processed and the current user created it then allow any manipulation
	if (req.pet && req.user && req.pet.user.id === req.user.id) {
		return next();
	}

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});
};
