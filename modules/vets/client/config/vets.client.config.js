'use strict';

// Configuring the Vets module
angular.module('vets').run(['Menus',
	function(Menus) {
		// Add the Vets dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Veterinarias',
			state: 'vets',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'vets', {
			title: 'Cercanas',
			state: 'vets.list'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'vets', {
			title: 'Dejar una consulta',
			state: 'vets.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'vets', {
			title: 'Llamar un Veterinario',
			state: 'vets.create'
		});
	}
]);
