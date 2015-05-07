'use strict';

// Petbreeds controller
angular.module('petbreeds').controller('PetbreedsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Petbreeds',
	function($scope, $stateParams, $location, Authentication, Petbreeds ) {
		$scope.authentication = Authentication;

		// Create new Petbreed
		$scope.create = function() {
			// Create new Petbreed object
			var petbreed = new Petbreeds ({
				name: this.name,
				pettype: this.type
			});

			// Redirect after save
			petbreed.$save(function(response) {
				$location.path('petbreeds/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.pettype = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Petbreed
		$scope.remove = function( petbreed ) {
			if ( petbreed ) { petbreed.$remove();

				for (var i in $scope.petbreeds ) {
					if ($scope.petbreeds [i] === petbreed ) {
						$scope.petbreeds.splice(i, 1);
					}
				}
			} else {
				$scope.petbreed.$remove(function() {
					$location.path('petbreeds');
				});
			}
		};

		// Update existing Petbreed
		$scope.update = function() {
			var petbreed = $scope.petbreed ;

			petbreed.$update(function() {
				$location.path('petbreeds/' + petbreed._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Petbreeds
		$scope.find = function() {
			console.log($scope.type);
			$scope.petbreeds = Petbreeds.query({'typeId': $scope.type});
		};

		// Find existing Petbreed
		$scope.findOne = function() {
			$scope.petbreed = Petbreeds.get({ 
				petbreedId: $stateParams.petbreedId
			});
		};
	}
]);
