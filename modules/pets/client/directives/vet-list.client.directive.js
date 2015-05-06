'use strict';

angular.module('pets').directive('vetList',  ['$location',
	function($location) {
		return {
			templateUrl: 'modules/pets/views/partials/vet-list.client.view.html',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {
				scope.goToVet = function(id){
					$location.path('/vets/' + id);
				}
        return;
      }
		};
	}
]);
