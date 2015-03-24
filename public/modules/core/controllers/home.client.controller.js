'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication'
	function($scope, $location, Authentication) {
		// Home controller logic
		// ...

		$scope.authentication = Authentication;

		$scope.checkAuthentication = function(){
			if($scope.authentication && $scope.authentication.user_id){
				$location('/timeline');
			}
		};
	}
]);
