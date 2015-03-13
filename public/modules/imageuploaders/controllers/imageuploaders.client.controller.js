'use strict';

// Imageuploaders controller
angular.module('imageuploaders').controller('ImageuploadersController', [
  '$scope', '$stateParams', '$location', 'Authentication','Upload', '$http',
	function($scope, $stateParams, $location, Authentication, Upload, $http) {
		$scope.authentication = Authentication;

		// Create new Imageuploader
		$scope.create = function(images) {
			// Create new Imageuploader object
      Upload.parse(images).then(function () {
        debugger;
      });
    };



		// Remove existing Imageuploader
		$scope.remove = function(imageuploader) {
			if ( imageuploader ) { 
				imageuploader.$remove();

				for (var i in $scope.imageuploaders) {
					if ($scope.imageuploaders [i] === imageuploader) {
						$scope.imageuploaders.splice(i, 1);
					}
				}
			} else {
				$scope.imageuploader.$remove(function() {
					$location.path('imageuploaders');
				});
			}
		};

		// Update existing Imageuploader
		$scope.update = function() {
			var imageuploader = $scope.imageuploader;

			imageuploader.$update(function() {
				$location.path('imageuploaders/' + imageuploader._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Imageuploaders
		$scope.find = function() {
			$scope.imageuploaders = Imageuploaders.query();
		};

		// Find existing Imageuploader
		$scope.findOne = function() {
			$scope.imageuploader = Imageuploaders.get({ 
				imageuploaderId: $stateParams.imageuploaderId
			});
		};
	}
]);
