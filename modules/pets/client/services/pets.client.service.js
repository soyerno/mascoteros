'use strict';

//Pets service used for communicating with the pets REST endpoints
angular.module('pets').factory('Pets', ['$resource',
	function($resource) {
		return $resource('/api/pets/:petId', {
			petId: '@_id',
			petSlug: '@_slug'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
