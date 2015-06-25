'use strict';

angular.module('core').directive("homeList", [function () {
    return {
        scope: {
            title: "=",
            items: "=",
            entityUrl: "="
        },
        templateUrl: 'modules/core/views/partials/home-list-directive-client-view.html',
        restrict: 'E',
        replace: true,
        link: function (scope, element, attributes) {

        }
    };
}]);
