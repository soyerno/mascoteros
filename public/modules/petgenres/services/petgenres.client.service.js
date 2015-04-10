'use strict';

//Petgenres service used to communicate Petgenres REST endpoints
angular.module('petgenres').factory('Petgenres', ['$resource',
	function($resource) {
		return $resource('api/petgenres/:petgenreId', { petgenreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
