'use strict';

//Rescues service used to communicate Rescues REST endpoints
angular.module('rescues').factory('Rescues', ['$resource',
	function($resource) {
		return $resource('api/rescues/:rescueId', { rescueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
