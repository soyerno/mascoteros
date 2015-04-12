'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

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
