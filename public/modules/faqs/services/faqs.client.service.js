'use strict';

//Faqs service used to communicate Faqs REST endpoints
angular.module('faqs').factory('Faqs', ['$resource',
	function($resource) {
		return $resource('api/faqs/:faqId', { faqId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
