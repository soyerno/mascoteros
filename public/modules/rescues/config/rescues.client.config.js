'use strict';

// Configuring the Articles module
angular.module('rescues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Rescatistas', 'rescues', 'dropdown', '/rescues(/create)?', false, null, null, 'fa fa-group');
		/*Menus.addSubMenuItem('sidebar', 'rescues', 'List Rescues', 'rescues');
		Menus.addSubMenuItem('sidebar', 'rescues', 'New Rescue', 'rescues/create');*/
	}
]);
