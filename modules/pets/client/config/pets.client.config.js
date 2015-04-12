'use strict';

// Configuring the Pets module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Add the pets dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Pets',
			state: 'pets',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'List Pets',
			state: 'pets.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Create Pets',
			state: 'pets.create'
		});
	}
]);
