'use strict';

// Pets controller
angular.module('pets').controller('PetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets','Upload', '$modal',
	function($scope, $stateParams, $location, Authentication, Pets, Upload, $modal  ) {
		$scope.authentication = Authentication;

		// Create new Pet
		$scope.create = function() {
			// Create new Pet object
			var pet = new Pets ({
				name: this.name,
				picture: this.picture,
				slug: this.name + '_' + this.breed,
				color: this.color,
				breed: this.breed,
				genre: this.genre,
				description: this.description,
				neutered: this.neutered
      });


			// Redirect after save
      Upload.parse(pet).then(function () {
        pet.$save(function(response) {
          $location.path('pets/' + response._id);
          // Clear form fields
          $scope.name = '';
          $scope.picture = '';
          $scope.slug = '';
          $scope.color = '';
          $scope.breed = '';
          $scope.neutered = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });


		};

		// Remove existing Pet
		$scope.remove = function(pet) {
			if ( pet ) { 
				pet.$remove();

				for (var i in $scope.pets) {
					if ($scope.pets [i] === pet) {
						$scope.pets.splice(i, 1);
					}
				}
			} else {
				$scope.pet.$remove(function() {
					$location.path('pets');
				});
			}
		};

		// Update existing Pet
		$scope.update = function() {
			var pet = $scope.pet;

			pet.$update(function() {
				$location.path('pets/' + pet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pets
		$scope.find = function() {
			$scope.pets = Pets.query();
		};

		// Find existing Pet
		$scope.findOne = function() {
			$scope.pet = Pets.get({ 
				petId: $stateParams.petId
			});
		};
	}
]);
