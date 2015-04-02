'use strict';

angular.module('pets').directive('petProfileView', [
	function() {
		return {
      templateUrl: 'modules/pets/views/partials/pet-profile-view.client.view.html',
			restrict: 'E',
      replace: true,
			link: function postLink(scope, element, attrs) {
        return;
			}
		};
	}
]);
