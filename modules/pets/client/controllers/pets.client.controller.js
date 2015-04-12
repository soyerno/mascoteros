'use strict';

angular.module('pets').controller('PetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets',
	function($scope, $stateParams, $location, Authentication, Pets) {
		$scope.authentication = Authentication;

	}
]);
