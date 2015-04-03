'use strict';

// Pets controller
angular.module('pets').controller('PetsController', ['$scope', '$resource', '$stateParams', '$location', 'Authentication', 'Pets', 'Upload', 'geolocation', 'Notifications', '$http',
	function($scope, $resource, $stateParams, $location, Authentication, Pets, Upload, geolocation, Notifications, $http) {
    $scope.authentication = Authentication;

    $scope.step = 1;

    $scope.$watch('step', function (step) {
      if (step === 3 && $scope.inviteUserEmail !== '') {
        $scope.email = $scope.inviteUserEmail;
      }
    });

    // Create new Pet
    $scope.create = function () {
      // Create new Pet object

      var pet = new Pets({
        name: this.name,
        picture: this.picture,
        slug: this.slug,
        color: this.color,
        breed: this.breed,
        isMissing: this.isMissing,
        genre: this.genre,
        yearOfBirth: this.yearOfBirth,
        description: this.description,
        neutered: this.neutered,
        email: this.email,
        address: this.address,
        isPrivate: this.isPrivate,
        isAdoption: this.isAdoption,
        tel1: this.tel1,
        tel2: this.tel2,
        coords: this.coords
      });

      $scope.formBusy = true;


      // Redirect after save
      Upload.parse(pet).then(function () {
        pet.$save(function (response) {
          $location.path('pet/' + response.slug);
          // Clear form fields
          $scope.name = '';
          $scope.picture = '';
          $scope.slug = '';
          $scope.color = '';
          $scope.breed = '';
          $scope.isMissing = '';
          $scope.neutered = '';
          $scope.email = '';
          $scope.address = '';
          $scope.isPrivate = '';
          $scope.isAdoption = '';
          $scope.tel1 = '';
          $scope.tel2 = '';
          $scope.coords = '';
        }, function (errorResponse) {
          $scope.formBusy = false;
          $scope.error = errorResponse.data.message;
        });
      });
    };

    // Remove existing Pet
    $scope.remove = function (pet) {
      if (pet) {
        pet.$remove();

        for (var i in $scope.pets) {
          if ($scope.pets [i] === pet) {
            $scope.pets.splice(i, 1);
          }
        }
      } else {
        $scope.pet.$remove(function () {
          $location.path('pets');
        });
      }
    };

    // Update existing Pet
    $scope.update = function () {
      $scope.formBusy = true;
      var pet = $scope.pet;
      delete pet.$promise;
      delete pet.$resolved;

      Upload.parse(pet).then(function () {
        pet.$update(function () {
          $location.path('pet/' + pet.slug);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
    };

    // Find a list of Pets
    $scope.find = function () {
      $scope.pets = Pets.query();
    };

    $scope.findAdoptions = function () {
      $http.get('/pets/adoption').
        success(function (data, status, headers, config) {
          $scope.pets = data;
        }).
        error(function (data, status, headers, config) {
          console.log('error loading adoption pets');
        });
    };

    // Find existing Pet
    $scope.findOne = function () {
      $scope.pet = Pets.get({
        petId: $stateParams.petId
      });
    };

    $scope.findOneBySlug = function () {
      var Pet = $resource('/pet/:petSlug', {petSlug: '@slug'});
      $scope.pet = Pet.get({petSlug: $stateParams.petSlug}, function () {
      });
    };

    var events = {
      places_changed: function (searchBox, event) {
        var places = searchBox.getPlaces();
        var newLat = places[0].geometry.location.lat();
        var newLong = places[0].geometry.location.lng();
        $scope.coords = { latitude: newLat, longitude: newLong };
        $scope.marker.coords = { latitude: newLat, longitude: newLong };
        $scope.setGeoLocation();
        $scope.address = places[0].formatted_address;
      }
    };

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };

    $scope.searchbox = { template: 'searchbox.tpl.html', events: events };

    $scope.setGeoLocation = function () {
      $scope.center = $scope.coords;
      $scope.coordsUpdates = 0;
      $scope.dynamicMoveCtr = 0;
      $scope.map = {center: $scope.center, zoom: 18};
      $scope.marker.coords = $scope.center;
    };

    $scope.getGeoLocalization = function () {
      geolocation.getLocation().then(function (data) {
        $scope.coords = {latitude: data.coords.latitude, longitude: data.coords.longitude};
        $scope.setGeoLocation();
      });
    };

    $scope.sendScanNotif = function () {
      /* @todo: add this to pet profile options*/
      var petSendNotification = true;
      if (petSendNotification) {
        // Create new Notification object
        var notification = new Notifications({
          title: $scope.pet.name + ' fue scaneado',
          pet: $scope.pet._id,
          geoLocation: $scope.coords,
          to: $scope.pet.user._id
        });

        // Redirect after save
        notification.$save(function (response) {
          console.log(response);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };

    $scope.setPetMissing = function (value) {
      $http.put('pets/' + $scope.pet._id + '/missing', {isMissing: value}).
        success(function (data, status, headers, config) {
          console.log(data);
          $scope.pet.isMissing = data.isMissing;
          //$location.path('pet/' + pet.slug);
        }).
        error(function (data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(data);
          $scope.error = data;
        });
    }

    $scope.findMissing = function() {
      console.log('missing');
      $http.get('/pets/missing').
        success(function(data, status, headers, config) {
          $scope.pets = data;
        }).
        error(function(data, status, headers, config) {
          console.log('error loading missing pets');
        });
    };
  }
]);
