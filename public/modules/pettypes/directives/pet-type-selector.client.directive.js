'use strict';

angular.module('pettypes').directive('petTypeSelector', [ 'Pettypes',
	function(Pettypes) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Pet type selector directive logic
				// ...

				element.text('this is the petTypeSelector directive');
			}
		};
	}
]);
