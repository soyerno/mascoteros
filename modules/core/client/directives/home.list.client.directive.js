'use strict';

angular.module('core').directive("homeList", [function () {
    return {
        scope: {
            title: "=",
            items: "=",
            limit: "=?",
            entityUrl: "="
        },
        templateUrl: 'modules/core/views/partials/home-list-directive-client-view.html',
        restrict: 'E',
        replace: true,
        link: function (scope, element, attributes) {

            if(!scope.limit){
                scope.limit = 4;
            }
            console.log(scope.limit);
        }
    };
}]);
