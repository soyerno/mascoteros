'use strict';

//Setting up route
angular.module('pet-articles').config(['$stateProvider',
	function($stateProvider) {
		// Pet articles state routing
		$stateProvider.
		state('pet-articles', {
			abstract: true,
			url: 'pet/:petId/pet-articles',
			template: '<ui-view/>'
		}).
		state('pet-articles.list', {
			url: '',
			templateUrl: 'modules/pet-articles/views/list-pet-articles.client.view.html'
		}).
		state('pet-articles.create', {
			url: '/create',
			templateUrl: 'modules/pet-articles/views/create-pet-article.client.view.html'
		}).
		state('pet-articles.view', {
			url: '/:petArticleId',
			templateUrl: 'modules/pet-articles/views/view-pet-article.client.view.html'
		}).
		state('pet-articles.edit', {
			url: '/:petArticleId/edit',
			templateUrl: 'modules/pet-articles/views/edit-pet-article.client.view.html'
		});
	}
]);
