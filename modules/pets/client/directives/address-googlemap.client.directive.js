'use strict';

angular.module('core').directive('addressGoogleMap', [ 'geolocation', '$timeout',
	function(geolocation, $timeout) {
		return {
			templateUrl: 'modules/pets/views/partials/address.googlemap.client.view.html',
			restrict: 'E',
			replace: true,
			link: function postLink($scope, element, attrs) {
				//MAPS
				$scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 18 };
				$scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 18 };
				$scope.options = {scrollwheel: false};
				$scope.coordsUpdates = 0;
				$scope.dynamicMoveCtr = 0;
				$scope.marker = {
					id: 0,
					coords: {
						latitude: 0,
						longitude: 0
					},
					options: { draggable: false },
					events: {
						dragend: function (marker, eventName, args) {
							$log.log('marker dragend');
							var lat = marker.getPosition().lat();
							var lon = marker.getPosition().lng();
							$log.log(lat);
							$log.log(lon);

							$scope.marker.options = {
								draggable: false,
								labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
								labelAnchor: "100 0",
								labelClass: "marker-labels"
							};
						}
					}
				};
				$scope.$watchCollection("marker.coords", function (newVal, oldVal) {
					if (_.isEqual(newVal, oldVal))
						return;
					$scope.coordsUpdates++;
				});

				$timeout(function () {
					$scope.marker.coords = {
						latitude: 0,
						longitude: 0
					};
					$scope.dynamicMoveCtr++;
					$timeout(function () {
						$scope.marker.coords = {
							latitude: 0,
							longitude: 0
						};
						$scope.dynamicMoveCtr++;
					}, 1000);
				}, 1000);

				var events = {
					places_changed: function (searchBox, event) {
						var places = searchBox.getPlaces();
						var newLat = places[0].geometry.location.lat();
						var newLong = places[0].geometry.location.lng();
						$scope.map.center = { latitude: newLat, longitude: newLong };
						$scope.marker.coords = { latitude: newLat, longitude: newLong };
						//$scope.setGeoLocation();
						$scope.address = places[0].formatted_address;
					}
				};

				$scope.searchbox = { template: 'searchbox.tpl.html', events: events };

				$scope.setGeoLocation = function () {
					$scope.map = {center: $scope.currentCoords, zoom: 18};
					$scope.marker.coords = $scope.currentCoords;
				};

				$scope.setCurrentLocation = function(){
					var current = $scope.getGeoLocalization();
					$scope.map = {center: current, zoom: 18};
					$scope.marker.coords = current;
				};

				$scope.getGeoLocalization = function () {
					geolocation.getLocation().then(function (data) {
						return {latitude: data.coords.latitude, longitude: data.coords.longitude};
					});
				};


				//END MAPS
			}
		};
	}
]);
