'use strict';

angular.module('petgenres').directive('petGenreSelector', [ 'Petgenres', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			template: '<select ng-options="genre in petgenres"></select>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.petgenres = [];
				$scope.$storage = $localStorage;

				scope.getGenres = function(){
					if($localStorage){
						console.log($localStorage);
					} else {
						$scope.petgenres = Petgenres.query();
					}
				}
			}
		};
	}
]);
