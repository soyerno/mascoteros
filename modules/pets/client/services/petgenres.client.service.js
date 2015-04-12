'use strict';

//Petgenres service used to communicate Petgenres REST endpoints
angular.module('pets').factory('Petgenres', ['$resource',
	function($resource) {
		return $resource('api/petgenres/:petgenreId', { petgenreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
