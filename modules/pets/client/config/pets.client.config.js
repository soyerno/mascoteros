'use strict';

// Configuring the Pets module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Add the pets dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Mascotas',
			state: 'pets',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Mis mascotas',
			state: 'pets.list'
		});

		// Add the dropdown create item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Nueva mascota',
			state: 'pets.create'
		});*/

		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Perdidas',
			state: 'pets.list-missing'
		});

		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Adopcion',
			state: 'pets.list-adoption'
		});

		Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Busca Novi@s',
			state: 'pets.list-dates'
		});

		// Add the dropdown list item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Listar Generos',
			state: 'petgenres.list'
		});*/

		// Add the dropdown create item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Crear Genero',
			state: 'petgenres.create'
		});*/

		// Add the dropdown list item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Listar Tipos',
			state: 'pettypes.list'
		});*/

		// Add the dropdown create item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Crear Tipo',
			state: 'pettypes.create'
		});*/

		// Add the dropdown list item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Listar Razas',
			state: 'petbreeds.list'
		});*/

		// Add the dropdown create item
		/*Menus.addSubMenuItem('topbar', 'pets', {
			title: 'Crear Raza',
			state: 'petbreeds.create'
		});*/
	}
]);
