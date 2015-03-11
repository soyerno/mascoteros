'use strict';

// Configuring the Articles module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Pets', 'pets', 'dropdown', '/pets(/create)?');
		Menus.addSubMenuItem('sidebar', 'pets', 'List Pets', 'pets');
		Menus.addSubMenuItem('sidebar', 'pets', 'New Pet', 'pets/create');
	}
]);
