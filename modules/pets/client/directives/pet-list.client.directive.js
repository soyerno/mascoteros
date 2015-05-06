'use strict';

angular.module('pets').directive('petList', [
	function() {
		return {
			templateUrl: 'modules/pets/views/partials/pet-list.client.view.html',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {
        return;
      }
		};
	}
]);
