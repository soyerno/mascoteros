'use strict';

// Setting up route
angular.module('pets').config(['$stateProvider',
	function($stateProvider) {
		// Pets state routing
		$stateProvider.
		state('pets', {
			abstract: true,
			url: '/pets',
			template: '<ui-view/>'
		}).
		state('pets.list', {
			url: '',
			templateUrl: 'modules/pets/views/list-pets.client.view.html'
		}).
		state('pets.create', {
			url: '/create',
			templateUrl: 'modules/pets/views/create-pet.client.view.html'
		}).
		state('pets.view', {
			url: '/:petId',
			templateUrl: 'modules/pets/views/view-pet.client.view.html'
		}).
		state('pets.edit', {
			url: '/:petId/edit',
			templateUrl: 'modules/pets/views/edit-pet.client.view.html'
		});
	}
]);
