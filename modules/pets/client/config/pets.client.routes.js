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
		state('pets.list-adoption', {
			url: '/adopciones',
			templateUrl: 'modules/pets/views/list-pets-adoption.client.view.html'
		}).
		state('pets.list-missing', {
			url: '/perdidos',
			templateUrl: 'modules/pets/views/list-pets-missing.client.view.html'
		}).
		state('pets.list-dates', {
			url: '/busca-novios',
			templateUrl: 'modules/pets/views/list-pets-dates.client.view.html'
		}).
		state('pets.create', {
			url: '/create',
			templateUrl: 'modules/pets/views/create-pet.client.view.html'
		}).
		state('pets.view', {
			url: '/:petId',
			templateUrl: 'modules/pets/views/view-pet.client.view.html',
			controller: 'PetsController'
		}).
		state('pets.edit', {
			url: '/:petId/edit',
			templateUrl: 'modules/pets/views/edit-pet.client.view.html'
		}).
		//BY SLUG
		state('pet', {
			abstract: true,
			url: '/pet',
			template: '<ui-view/>'
		}).
		state('pet.viewSlug', {
			url: '/:petSlug',
			templateUrl: 'modules/pets/views/view-pet.client.view.html',
			controller: 'PetsController'
		}).
		//GENRES
		state('petgenres', {
			abstract: true,
			url: '/petgenres',
			template: '<ui-view/>'
		}).
		state('petgenres.list', {
			url: '',
			templateUrl: 'modules/pets/views/list-petgenres.client.view.html'
		}).
		state('petgenres.create', {
			url: '/create',
			templateUrl: 'modules/pets/views/create-petgenre.client.view.html'
		}).
		state('petgenres.view', {
			url: '/:petgenreId',
			templateUrl: 'modules/pets/views/view-petgenre.client.view.html'
		}).
		state('petgenres.edit', {
			url: '/:petgenreId/edit',
			templateUrl: 'modules/pets/views/edit-petgenre.client.view.html'
		}).
			//TYPES
		state('pettypes', {
			abstract: true,
			url: '/pettypes',
			template: '<ui-view/>'
		}).
		state('pettypes.list', {
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
