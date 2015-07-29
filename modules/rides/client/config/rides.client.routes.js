'use strict';

//Setting up route
angular.module('rides').config(['$stateProvider',
	function($stateProvider) {
		// Rides state routing
		$stateProvider.
		state('rides', {
			abstract: true,
			url: '/rides',
			template: '<ui-view/>'
		}).
		state('rides.list', {
			url: '',
			templateUrl: 'modules/rides/views/list-rides.client.view.html'
		}).
		state('rides.create', {
			url: '/create',
			templateUrl: 'modules/rides/views/create-ride.client.view.html'
		}).
		state('rides.view', {
			url: '/:rideId',
			templateUrl: 'modules/rides/views/view-ride.client.view.html'
		}).
		state('rides.edit', {
			url: '/:rideId/edit',
			templateUrl: 'modules/rides/views/edit-ride.client.view.html'
		});
	}
]);