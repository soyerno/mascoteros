'use strict';

angular.module('pets').directive('qr',[ '$http',
	function($http) {
		return {
			templateUrl: '/modules/pets/views/qr.client.view.html',
			restrict: 'E',
			replace: true,
			scope: {
				pet: '='
			},
			link: function postLink(scope, element, attr) {

				scope.svg = "";

				$http.get('/qr/' + scope.pet.slug).
					success(function(data, status, headers, config) {
						// this callback will be called asynchronously
						// when the response is available
						scope.svg = data;
					}).
					error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						console.log('ERROR');
					});

			}
		};
	}
]);
