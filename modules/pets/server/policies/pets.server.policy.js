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
			resources: '/api/pets/missing',
			permissions: '*'
		}, {
			resources: '/api/pets/dates',
			permissions: '*'
		}, {
			resources: '/api/pets/adoption',
			permissions: '*'
		}, {
			resources: '/api/pets/:petId',
			permissions: '*'
		}, {
			resources: '/api/pet/:petSlug',
			permissions: '*'
		}, {
			resources: '/api/petgenres',
			permissions: '*'
		}, {
			resources: '/api/petgenres/:petgenreId',
			permissions: '*'
		}, {
			resources: '/api/pettypes',
			permissions: '*'
		}, {
			resources: '/api/pettypes/:pettypeId',
			permissions: '*'
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/pets',
			permissions: ['get', 'post']
		}, {
			resources: '/api/pets/missing',
			permissions: ['get']
		}, {
			resources: '/api/pets/dates',
			permissions: ['get']
		}, {
			resources: '/api/pets/adoption',
			permissions: ['get']
		}, {
			resources: '/api/pets/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pet/:petSlug',
			permissions: ['get']
		}, {
			resources: '/api/petgenres',
			permissions: ['get']
		}, {
			resources: '/api/petgenres/:petgenreId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:pettypeId',
			permissions: ['get']
		},]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/pets',
			permissions: ['get']
		}, {
			resources: '/api/pets/missing',
			permissions: ['get']
		}, {
			resources: '/api/pets/dates',
			permissions: ['get']
		}, {
			resources: '/api/pets/adoption',
			permissions: ['get']
		}, {
			resources: '/api/pets/:petId',
			permissions: ['get']
		}, {
			resources: '/api/pet/:petSlug',
			permissions: ['get']
		}, {
			resources: '/api/petgenres',
			permissions: ['get']
		}, {
			resources: '/api/petgenres/:petgenreId',
			permissions: ['get']
		}, {
			resources: '/api/pettypes',
			permissions: ['get']
		}, {
			resources: '/api/pettypes/:pettypeId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If Pets Policy Allows
 */

var checkIfOwner = function(pet, userId, cb){
	var newPet = pet;
	if(pet && userId){
		pet.owners.forEach(function(element, index, array){
			var elementID = element._id.toString();
			if(elementID === userId){
				newPet.isOwner = true;
			}
		});
	}
	return newPet;
};


exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	var isOwner = checkIfOwner(req.pet, req.user._id);
	// If an pet is being processed and the current user created it then allow any manipulation
	if (req.pet && req.user && isOwner) {
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
