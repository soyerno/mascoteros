/*
'use strict';

// Configuring the Pet articles module
angular.module('pet-articles').run(['Menus',
	function(Menus) {
		// Add the Pet articles dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Pet articles',
			state: 'pet-articles',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'pet-articles', {
			title: 'List Pet articles',
			state: 'pet-articles.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'pet-articles', {
			title: 'Create Pet article',
			state: 'pet-articles.create'
		});
	}
]);*/
