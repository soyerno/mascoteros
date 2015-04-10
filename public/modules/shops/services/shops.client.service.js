'use strict';

//Shops service used to communicate Shops REST endpoints
angular.module('shops').factory('Shops', ['$resource',
	function($resource) {
		return $resource('api/shops/:shopId', { shopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
