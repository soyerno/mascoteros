'use strict';

//Petbreeds service used to communicate Petbreeds REST endpoints
angular.module('petbreeds').factory('Petbreeds', ['$resource',
	function($resource) {
		return $resource('api/petbreeds/:petbreedId', { petbreedId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);