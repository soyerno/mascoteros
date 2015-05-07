'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.founds = {};
		$scope.founds.foundCounter = 1000.00;
		$scope.increaseCounter = function(){
			setInterval(function(){
				$scope.founds.foundCounter = $scope.founds.foundCounter + Math.floor((Math.random() * 10) + 1);
				$scope.$apply();
			}, 1000);
		};
		$scope.increaseCounter();

		$scope.checkAuthentication = function(){
			if($scope.authentication && $scope.authentication.user._id){
				console.log($location);
				var currentLocation = $location.path();
				if(currentLocation != '/'){
					$location.path('/');
				}
			}
		};
	}
]);
