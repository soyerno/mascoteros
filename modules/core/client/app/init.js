'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName)
	.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');
		}
	])
	.config(function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			//    key: 'your api key',
			v: '3.17',
			libraries: 'places' // Required for SearchBox.
		});
	})
	.run(['$rootScope',
		function($rootScope) {
			$rootScope.IS_DESKTOP = device.desktop();
			$rootScope.IS_TABLET = device.tablet();
			$rootScope.IS_MOBILE = device.mobile();

			function detectViewportOrientation() {
				$rootScope.IS_PORTRAIT = device.portrait();
			}

			detectViewportOrientation();

			if (!$rootScope.IS_DESKTOP || location.href.indexOf('localhost') !== -1) {
				window.addEventListener('orientationchange', function() {
					setTimeout(function() {
						detectViewportOrientation();
						$rootScope.$broadcast('WINDOW:orientation:change');
					});
				}, false);
			}
		}
	]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
