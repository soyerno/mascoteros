'use strict';

//Pet articles service used to communicate Pet articles REST endpoints
angular.module('pet-articles').factory('PetArticles', ['$resource',
	function($resource) {
		return $resource('api/pet-articles/:petArticleId', { petArticleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);