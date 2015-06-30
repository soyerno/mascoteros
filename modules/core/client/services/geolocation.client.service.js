'use strict';

// Create the Socket.io wrapper service
angular.module('core')
  .service('Geolocalization', ['Authentication', '$state', '$timeout', 'localStorageServiceProvider',
  function(Authentication, $state, $timeout, localStorageServiceProvider) {
    // Connect to the Socket.io server only when authenticated
    if (Authentication.user) {
      this.socket = io();
    } else {
      $state.go('home');
    }
    //https://www.npmjs.com/package/angular-local-storage
    //https://www.npmjs.com/package/angular-local-storage#configuration-example
    this.getLocalization = function() {
     if(localStorageServiceProvider.get(location)) {

     }
    };
    /*
    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };*/
  }
]);
