'use strict';

angular.module('petgenres').directive('petGenreSelector', [ 'Petgenres', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			template: '<select ng-options="item._id as item.name for item in petgenres"></select>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.petgenres = [];
				scope.$storage = $localStorage;

				scope.getGenres = function(){
					if(scope.$storage.petgenres && scope.$storage.petgenres.length){
						scope.petgenres = scope.$storage.petgenres;
						console.log('$localStorage', scope.petgenres);
					} else {
						scope.petgenres = Petgenres.query();
						scope.$storage.petgenres = scope.petgenres;
						console.log('else', scope.petgenres);
					}
				}
				scope.getGenres();
			}
		};
	}
]);
