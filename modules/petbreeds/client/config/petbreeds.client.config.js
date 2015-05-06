/*
'use strict';

// Configuring the Petbreeds module
angular.module('petbreeds').run(['Menus',
	function(Menus) {
		// Add the Petbreeds dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Petbreeds',
			state: 'petbreeds',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'petbreeds', {
			title: 'List Petbreeds',
			state: 'petbreeds.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'petbreeds', {
			title: 'Create Petbreed',
			state: 'petbreeds.create'
		});
	}
]);*/
