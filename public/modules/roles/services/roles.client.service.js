'use strict';

//Roles service used to communicate Roles REST endpoints
angular.module('roles').factory('Roles', ['$resource',
	function($resource) {
		return $resource('api/roles/:roleId', { roleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
