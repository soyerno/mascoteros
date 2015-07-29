'use strict';

//Pets service used for communicating with the pets REST endpoints
angular.module('vets').factory('Vets', ['$resource',
	function($resource) {
		return $resource('/api/vets/:vetId', {
			vetId: '@_id',
			vetSlug: '@_slug'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

