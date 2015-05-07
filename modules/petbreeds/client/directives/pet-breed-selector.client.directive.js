'use strict';

angular.module('pets').directive('petBreedSelector', [ 'Petbreeds', '$localStorage',
    function(Petbreeds, $localStorage) {
        return {
            templateUrl: 'modules/petbreeds/views/partials/pet-breed-selector.html',
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs) {
                scope.$storage = $localStorage;

                scope.$watch('type', function(){
                    scope.getBreeds();
                });

                scope.getBreeds = function(){
                    /*if(scope.$storage.petbreeds && scope.$storage.petbreeds.length){
                        scope.petbreeds = scope.$storage.petbreeds;
                        console.log('$localStorage', scope.petbreeds);
                    } else {*/
                        scope.petbreeds = Petbreeds.query({'typeId': scope.type});
                        scope.$storage.petbreeds = scope.petbreeds;
                      /*  console.log('else', scope.petbreeds);*/
                    /*}*/
                };

            }
        };
    }
]);

