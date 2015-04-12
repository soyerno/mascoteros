'use strict';

//Pettypes service used to communicate Pettypes REST endpoints
angular.module('pets').factory('Pettypes', ['$resource',
	function($resource) {
		return $resource('api/pettypes/:pettypeId', { pettypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
