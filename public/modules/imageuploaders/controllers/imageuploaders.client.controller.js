'use strict';

// Imageuploaders controller
angular.module('imageuploaders').controller('ImageuploadersController', [
  '$scope', '$stateParams', '$location', 'Authentication', 'Upload', '$http',
	function($scope, $stateParams, $location, Authentication, Upload, $http) {
		$scope.authentication = Authentication;
    $scope.vm  = {};
    $scope.vm.file = {};
    $scope.vm.text = '';

    // Create new Imageuploader
		$scope.create = function() {
			// Create new Imageuploader object
      Upload.parse($scope.vm).then(function (form) {
        //ya tengo la url
      });
    };

	}
]).directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.$apply(function () {
            scope.fileread = changeEvent.target.files[0];
            // or all selected files:
            // scope.fileread = changeEvent.target.files;
          });
        });
      }
    };
  }]);
