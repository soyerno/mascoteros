'use strict';

// Configuring the Articles module
angular.module('faqs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Faqs', 'faqs', 'dropdown', '/faqs(/create)?');
		Menus.addSubMenuItem('sidebar', 'faqs', 'List Faqs', 'faqs');
		Menus.addSubMenuItem('sidebar', 'faqs', 'New Faq', 'faqs/create');
	}
]);