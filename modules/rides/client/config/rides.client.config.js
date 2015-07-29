/*
'use strict';

// Configuring the Rides module
angular.module('rides').run(['Menus',
	function(Menus) {
		// Add the Rides dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Rides',
			state: 'rides',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'rides', {
			title: 'List Rides',
			state: 'rides.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'rides', {
			title: 'Create Ride',
			state: 'rides.create'
		});
	}
]);*/
