'use strict';

// Configuring the Vets module
angular.module('vets').run(['Menus',
	function(Menus) {
		// Add the Vets dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Vets',
			state: 'vets',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'vets', {
			title: 'List Vets',
			state: 'vets.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'vets', {
			title: 'Create Vet',
			state: 'vets.create'
		});
	}
]);