'use strict';

//Setting up route
angular.module('faqs').config(['$stateProvider',
	function($stateProvider) {
		// Faqs state routing
		$stateProvider.
		state('listFaqs', {
			url: '/faqs',
			templateUrl: 'modules/faqs/views/list-faqs.client.view.html'
		}).
		state('createFaq', {
			url: '/faqs/create',
			templateUrl: 'modules/faqs/views/create-faq.client.view.html'
		}).
		state('viewFaq', {
			url: '/faqs/:faqId',
			templateUrl: 'modules/faqs/views/view-faq.client.view.html'
		}).
		state('editFaq', {
			url: '/faqs/:faqId/edit',
			templateUrl: 'modules/faqs/views/edit-faq.client.view.html'
		});
	}
]);