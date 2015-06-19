'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location', '$http',
	function($scope, Authentication, $location, $http) {
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


		//DATES
		var getPetDates = function(){
			$http.get('/api/pets/dates').
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.dates = data;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		}
		getPetDates();
		$scope.dates = [];

		//ADOPTION
		var getPetAdoption= function(){
			$http.get('/api/pets/adoption').
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.adoption = data;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		}
		getPetAdoption();
		$scope.adoption = [];

		//MISSING
		var getPetMissing = function(){
			$http.get('/api/pets/missing').
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.missing = data;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		}
		getPetMissing();
		$scope.missing = [];

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
