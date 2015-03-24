'use strict';

// Configuring the Articles module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Mascotas', 'pets', 'dropdown', '/pets(/create)?', false, null, null, 'fa fa-paw');
		Menus.addSubMenuItem('sidebar', 'pets', 'Ranking', 'pets/top', false, null, null, 'icon-trophy');
		Menus.addSubMenuItem('sidebar', 'pets', 'Nueva Mascota', 'pets/create', false, null, null, 'fa-plus-circle');
	}
]);
