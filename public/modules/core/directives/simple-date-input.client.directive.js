'use strict';

angular.module('core').directive('simpleDateInput', [
	function() {
		return {
			templateUrl: 'modules/core/views/partials/simple-date-input.client.view.html',
      scope: {
        date: '='
      },
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

        scope.today = function() {
          $scope.yearOfBirth = new Date();
        };
        //$scope.today();

        scope.clear = function () {
          scope.yearOfBirth = null;
        };

        // Disable weekend selection
        //scope.disabled = function(date, mode) {
        //  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        //};

        scope.toggleMin = function() {
          scope.minDate = scope.minDate ? null : '01/01/1970';
        };
        scope.toggleMin();

        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          scope.opened = true;
        };

        scope.dateOptions = {
          formatYear: 'yyyy',
          startingDay: 1
        };

        scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];

        return false;
			}
		};
	}
]);
