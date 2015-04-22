'use strict';

// Configuring the Events module
angular.module('events').run(['Menus',
	function(Menus) {
		// Add the Events dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Events',
			state: 'events',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'events', {
			title: 'List Events',
			state: 'events.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'events', {
			title: 'Create Event',
			state: 'events.create'
		});
	}
]);