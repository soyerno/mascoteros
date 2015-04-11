'use strict';

angular.module('core').directive('welcomeModal', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Welcome modal directive logic
				// ...

				element.text('this is the welcomeModal directive');
			}
		};
	}
]);