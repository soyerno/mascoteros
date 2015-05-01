'use strict';

// Vets controller
angular.module('vets').controller('VetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vets', '$timeout', 'geolocation',
	function($scope, $stateParams, $location, Authentication, Vets, $timeout, geolocation ) {
		$scope.authentication = Authentication;

		//MAPS
		$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
		$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
		$scope.options = {scrollwheel: false};
		$scope.coordsUpdates = 0;
		$scope.dynamicMoveCtr = 0;
		$scope.marker = {
			id: 0,
			coords: {
				latitude: 40.1451,
				longitude: -99.6680
			},
			options: { draggable: false },
			events: {
				/*dragend: function (marker, eventName, args) {
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
				}*/
			}
		};
		$scope.radioSelected = {text: '1km', val: '0.0001'};
		$scope.radios = [
			{text: '1km', val: '0.0001'},
			{text: '3km', val: '0.0003'},
			{text: '5km', val: '0.0005'},
			{text: '10km', val: '0.001'}
		];

		$scope.$watchCollection("marker.coords", function (newVal, oldVal) {
			if (_.isEqual(newVal, oldVal))
				return;
			$scope.coordsUpdates++;
		});
		$timeout(function () {
			$scope.marker.coords = {
				latitude: 42.1451,
				longitude: -100.6680
			};
			$scope.dynamicMoveCtr++;
			$timeout(function () {
				$scope.marker.coords = {
					latitude: 43.1451,
					longitude: -102.6680
				};
				$scope.dynamicMoveCtr++;
			}, 2000);
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

		// Create new Vet
		$scope.create = function() {
			// Create new Vet object
			var vet = new Vets ({
				name: this.name,
				coords: $scope.marker.coords,
				address: this.address
			});

			// Redirect after save
			vet.$save(function(response) {
				$location.path('vets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vet
		$scope.remove = function( vet ) {
			if ( vet ) { vet.$remove();

				for (var i in $scope.vets ) {
					if ($scope.vets [i] === vet ) {
						$scope.vets.splice(i, 1);
					}
				}
			} else {
				$scope.vet.$remove(function() {
					$location.path('vets');
				});
			}
		};

		// Update existing Vet
		$scope.update = function() {
			var vet = $scope.vet ;

			vet.$update(function() {
				$location.path('vets/' + vet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vets
		$scope.find = function() {
			geolocation.getLocation().then(function (data) {
				$scope.vets = Vets.query({latitude: data.coords.latitude, longitude: data.coords.longitude, radio: $scope.radioSelected.val});
				console.log($scope.vets);
			});
		};

		// Find existing Vet
		$scope.findOne = function() {
			$scope.vet = Vets.get({ 
				vetId: $stateParams.vetId
			});
		};
	}
]);
