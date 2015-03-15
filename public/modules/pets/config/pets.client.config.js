'use strict';

// Configuring the Articles module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Mascotas', 'pets', 'dropdown', '/pets(/create)?', true, null, null, 'fa fa-paw');
		/*Menus.addSubMenuItem('sidebar', 'pets', 'Mis Mascotas', 'pets');*/
		Menus.addSubMenuItem('sidebar', 'pets', 'Nueva Mascota', 'pets/create');
	}
]);
