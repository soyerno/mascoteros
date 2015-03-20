'use strict';

angular.module('pets').factory('Slugcheck', [
	function() {
		// Slugcheck service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;

        .service('slugService', ['$q','Restangular','$routeParams', function ($q, Restangular, $routeParams) {

          this.checkSlug = function (scope) {
            if (scope.video) {
              var videoSlug = scope.video.slug;
              var videoId = scope.video._id;
              checkSlugApi(videoSlug, videoId).then(
                function (valor) {
                  if (valor) {
                    scope.$broadcast('displayPopUp', {
                      noCancel: true,
                      isShowed: false,
                      message: 'El slug cargado existe en un video, se cambiara para que no haya colision de nombres.'
                    });
                    getAvaibleSlug(videoSlug, videoId).then(function (newSlug) {
                      scope.video.slug = newSlug;
                    });
                  }
                }
              );
            }
          };

          var getAvaibleSlug = function(videoSlug, videoId, deferred){

            if(!deferred){
              deferred = $q.defer();
            }

            if (isNaN(videoSlug[videoSlug.length - 1])) {

              if (videoSlug[videoSlug.length - 1] === '-') {
                videoSlug = videoSlug  + '1';
              } else {
                videoSlug = videoSlug  + '-1';
              }

            } else {
              videoSlug = videoSlug.slice(0,-1) + (parseInt(videoSlug[videoSlug.length - 1]) + 1);
            }

            checkSlugApi(videoSlug, videoId).then(function(exists){

              if (exists) {
                getAvaibleSlug(videoSlug, videoId, deferred);
              } else {
                return deferred.resolve(videoSlug);
              }

            });

            return deferred.promise;
          };

          var checkSlugApi = function(videoSlug, videoId, deferred){

            if(!deferred){
              deferred = $q.defer();
            }

            Restangular.one('programs', $routeParams.programId).customGET('check-slug/' + videoSlug).then(
              function (slugValue) {
                if (slugValue.videoId && slugValue.videoId !== videoId) {
                  return deferred.resolve(true);
                } else {
                  return deferred.resolve(false);
                }
              });

            return deferred.promise;
          };
        }]);

      }
		};
	}
]);
