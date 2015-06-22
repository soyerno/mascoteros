'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location', '$http', 'geolocation',
	function($scope, Authentication, $location, $http, geolocation) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.founds = {};
    $scope.dates = [];
    $scope.adoption = [];
    $scope.missing = [];
    $scope.vets = [];

    $scope.checkAuthentication = function(){
      if($scope.authentication && $scope.authentication.user._id){
        console.log($location);
        var currentLocation = $location.path();
        if(currentLocation != '/'){
          $location.path('/');
        }
      }
    };

    var getVets = function() {
      geolocation
        .getLocation()
        .then(
        function (data) {
          $scope.radioSelected = '1000';
          $http.get('/api/vets', {
            params: {
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
              radio: $scope.radioSelected
            }
          }).
            success(function(data, status, headers, config) {
              $scope.vets = data.slice(0,4);
            }).
            error(function(data, status, headers, config) {
            });

        });


    };

		var getPetDates = function() {
			$http.get('/api/pets/dates').
				success(function(data, status, headers, config) {
					$scope.dates = data;
				}).
				error(function(data, status, headers, config) {
        });
		};

		var getPetAdoption = function(){
			$http.get('/api/pets/adoption').
				success(function(data, status, headers, config) {
					$scope.adoption = data;
				}).
				error(function(data, status, headers, config) {
				});
		};

		var getPetMissing = function(){
			$http.get('/api/pets/missing').
				success(function(data, status, headers, config) {
					$scope.missing = data;
				}).
				error(function(data, status, headers, config) {
				});
		};

    getPetMissing();

    getPetDates();

    getPetAdoption();

    getVets();


    /*$scope.founds.foundCounter = 1000.00;

     $scope.increaseCounter = function(){
     setInterval(function(){
     $scope.founds.foundCounter = $scope.founds.foundCounter + Math.floor((Math.random() * 10) + 1);
     $scope.$apply();
     }, 1000);
     };

     $scope.increaseCounter();*/

  }
]);
