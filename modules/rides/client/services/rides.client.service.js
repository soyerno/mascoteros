'use strict';

//Rides service used to communicate Rides REST endpoints
angular.module('rides').factory('Rides', ['$resource',
	function($resource) {
		return $resource('api/rides/:rideId', { rideId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);