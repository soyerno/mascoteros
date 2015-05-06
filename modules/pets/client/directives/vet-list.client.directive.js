'use strict';

angular.module('pets').directive('vetList', [
	function() {
		return {
			templateUrl: 'modules/pets/views/partials/vet-list.client.view.html',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {
        return;
      }
		};
	}
]);
