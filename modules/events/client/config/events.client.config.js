'use strict';

// Configuring the Events module
angular.module('events').run(['Menus',
	function(Menus) {
		// Add the Events dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Eventos',
			state: 'events',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'events', {
			title: 'Proximos eventos',
			state: 'events.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'events', {
			title: 'Crear evento',
			state: 'events.create'
		});
	}
]);
