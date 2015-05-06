'use strict';

//Setting up route
angular.module('petbreeds').config(['$stateProvider',
	function($stateProvider) {
		// Petbreeds state routing
		$stateProvider.
		state('petbreeds', {
			abstract: true,
			url: '/petbreeds',
			template: '<ui-view/>'
		}).
		state('petbreeds.list', {
			url: '',
			templateUrl: 'modules/petbreeds/views/list-petbreeds.client.view.html'
		}).
		state('petbreeds.create', {
			url: '/create',
			templateUrl: 'modules/petbreeds/views/create-petbreed.client.view.html'
		}).
		state('petbreeds.view', {
			url: '/:petbreedId',
			templateUrl: 'modules/petbreeds/views/view-petbreed.client.view.html'
		}).
		state('petbreeds.edit', {
			url: '/:petbreedId/edit',
			templateUrl: 'modules/petbreeds/views/edit-petbreed.client.view.html'
		});
	}
]);