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
		}).
		state('petsgenres', {
			abstract: true,
			url: '/petsgenres',
			template: '<ui-view/>'
		}).
		state('list.petgenres', {
			url: '',
			templateUrl: 'modules/pets/views/list-petgenres.client.view.html'
		}).
		state('petsgenres.create', {
			url: '/create',
			templateUrl: 'modules/pets/views/create-petgenre.client.view.html'
		}).
		state('petsgenres.view', {
			url: '/:petgenreId',
			templateUrl: 'modules/pets/views/view-petgenre.client.view.html'
		}).
		state('petsgenres.edit', {
			url: '/:petgenreId/edit',
			templateUrl: 'modules/pets/views/edit-petgenre.client.view.html'
		}).
		state('pettype', {
			abstract: true,
			url: '/petstypes',
			template: '<ui-view/>'
		}).
		state('list.pettypes', {
			url: '',
			templateUrl: 'modules/pets/views/list-pettypes.client.view.html'
		}).
		state('pettypes.create', {
			url: '/create',
			templateUrl: 'modules/pets/views/create-pettype.client.view.html'
		}).
		state('pettypes.view', {
			url: '/:pettypeId',
			templateUrl: 'modules/pets/views/view-pettype.client.view.html'
		}).
		state('pettypes.edit', {
			url: '/:pettypeId/edit',
			templateUrl: 'modules/pets/views/edit-pettype.client.view.html'
		});
	}
]);
