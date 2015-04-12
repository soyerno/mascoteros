'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
  function(Menus) {

    // Add default menu entry
    Menus.addMenuItem('sidebar', 'Inicio', 'home', null, '/home', true, null, null, 'icon-home');

  }
]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
  // Lazy Load modules configuration
  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: APP_REQUIRES.modules
  });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
  function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
  // registering components after bootstrap
  angular.module('core').controller = $controllerProvider.register;
  angular.module('core').directive  = $compileProvider.directive;
  angular.module('core').filter     = $filterProvider.register;
  angular.module('core').factory    = $provide.factory;
  angular.module('core').service    = $provide.service;
  angular.module('core').constant   = $provide.constant;
  angular.module('core').value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix : 'modules/core/i18n/',
    suffix : '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useLocalStorage();

}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

  cfpLoadingBarProvider.includeBar = true;
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 500;
  cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}])
.config(function($locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  }).hashPrefix('');
})
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'places' // Required for SearchBox.
  });
})
.run(function(amMoment){
  amMoment.changeLocale('es');
}).run(function($FB){
  $FB.init('1414293935539684');
});
