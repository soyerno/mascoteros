'use strict';

// Pets controller
angular.module('pets').controller('PetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets', 'Upload', '$http',
	function($scope, $stateParams, $location, Authentication, Pets, Upload, $http) {
		$scope.authentication = Authentication;

		$scope.step = 1;

		$scope.$watch('step', function(step){
			if(step === 3 && $scope.inviteUserEmail != ''){
				$scope.email = $scope.inviteUserEmail;
			}
		});

		// Create new Pet
		$scope.create = function() {
			// Create new Pet object

			var pet = new Pets ({
				name: this.name,
				picture: this.picture,
				slug: this.slug,
				color: this.color,
				breed: this.breed,
				genre: this.genre,
        yearOfBirth: this.yearOfBirth,
				description: this.description,
				neutered: this.neutered,
				email: this.email,
				address: this.address
			});

			$scope.formBusy = true;


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
					$scope.email = '';
					$scope.address = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
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
			$scope.formBusy = true;
			var pet = $scope.pet;
			delete pet.$promise;
			delete pet.$resolved;

			Upload.parse(pet).then(function () {
				pet.$update(function() {
					$location.path('pets/' + pet._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
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

    $scope.findOneBySlug = function() {
      $http.get('/pet/' + $stateParams.petSlug).
        success(function(data, status, headers, config) {
          $scope.pet = data;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };
	}
]);
