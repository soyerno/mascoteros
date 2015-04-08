'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'angleApp';
	// var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];
	var applicationModuleVendorDependencies = [
		'ngRoute',
		'ngAnimate',
		'ngStorage',
		'ngTouch',
		'ngCookies',
		'pascalprecht.translate',
		'ui.bootstrap',
		'ui.router',
		'restangular',
		'oc.lazyLoad',
		'cfp.loadingBar',
		'ngSanitize',
		'ngResource',
		'ui.utils',
		'ui.checkbox',
		'imageuploaders',
		'ngStorage',
		'petgenres',
		'pettypes',
		'angularMoment',
		'djds4rce.angular-socialshare',
		'geolocation',
		'textAngular',
		'uiGmapgoogle-maps'
	];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('comments');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('contacts');
/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

angular.module('core').run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache',
  function ($rootScope, $state, $stateParams, $window, $templateCache) {

    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // Uncomment this to disables template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });*/

    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: 'Mascoteros',
      description: 'Somos amigos de las mascotas',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
      name:     'John',
      job:      'ng-Dev',
      picture:  'app/img/user/02.jpg'
    };
  }
]);

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('events');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('faqs');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('imageuploaders');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('issues');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('notifications');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('petgenres');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('pets');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('pettypes');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('rescues');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('roles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('shelters');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('shops');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('trainers');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('vets');
'use strict';

// Configuring the Articles module
/*
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Articles', 'articles', 'dropdown', '/articles(/.*)?', false, null, 20);
		Menus.addSubMenuItem('sidebar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('sidebar', 'articles', 'New Article', 'articles/create');
	}
]);*/

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('app.listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('app.createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('app.viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html',
			controller: 'ArticlesController'
		}).
		state('app.editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('comments').config(['$stateProvider',
	function($stateProvider) {
		// Comments state routing
		$stateProvider.
		state('listComments', {
			url: '/comments',
			templateUrl: 'modules/comments/views/list-comments.client.view.html'
		}).
		state('createComment', {
			url: '/comments/create',
			templateUrl: 'modules/comments/views/create-comment.client.view.html'
		}).
		state('viewComment', {
			url: '/comments/:commentId',
			templateUrl: 'modules/comments/views/view-comment.client.view.html'
		}).
		state('editComment', {
			url: '/comments/:commentId/edit',
			templateUrl: 'modules/comments/views/edit-comment.client.view.html'
		});
	}
]);
'use strict';

// Comments controller
angular.module('comments').controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments',
	function($scope, $stateParams, $location, Authentication, Comments) {
		$scope.authentication = Authentication;

		// Create new Comment
		$scope.create = function() {
			// Create new Comment object
			var comment = new Comments ({
				name: this.name
			});

			// Redirect after save
			comment.$save(function(response) {
				$location.path('comments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Comment
		$scope.remove = function(comment) {
			if ( comment ) { 
				comment.$remove();

				for (var i in $scope.comments) {
					if ($scope.comments [i] === comment) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('comments');
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment;

			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
		};

		// Find existing Comment
		$scope.findOne = function() {
			$scope.comment = Comments.get({ 
				commentId: $stateParams.commentId
			});
		};
	}
]);
'use strict';

//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', ['$resource',
	function($resource) {
		return $resource('comments/:commentId', { commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('contacts').config(['$stateProvider',
	function($stateProvider) {
		// Contacts state routing
		$stateProvider.
		state('app.listContacts', {
			url: '/contacts',
			templateUrl: 'modules/contacts/views/list-contacts.client.view.html'
		}).
		state('app.createContact', {
			url: '/contacts/create',
			templateUrl: 'modules/contacts/views/create-contact.client.view.html'
		}).
		state('app.viewContact', {
			url: '/contacts/:contactId',
			templateUrl: 'modules/contacts/views/view-contact.client.view.html'
		}).
		state('app.editContact', {
			url: '/contacts/:contactId/edit',
			templateUrl: 'modules/contacts/views/edit-contact.client.view.html'
		});
	}
]);

'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts',
	function($scope, $stateParams, $location, Authentication, Contacts) {
		$scope.authentication = Authentication;

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				name: this.name,
				role: this.role,
				tel: this.tel,
				email: this.email
			});

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts');

				// Clear form fields
				$scope.name = '';
				$scope.role = '';
				$scope.tel = '';
				$scope.email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contacts
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};
	}
]);

'use strict';

//Contacts service used to communicate Contacts REST endpoints
angular.module('contacts').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('contacts/:contactId', { contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
.config(["$locationProvider", function($locationProvider){
  $locationProvider.html5Mode(true).hashPrefix('!');
}])
.config(["uiGmapGoogleMapApiProvider", function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'places' // Required for SearchBox.
  });
}])
.run(["amMoment", function(amMoment){
  amMoment.changeLocale('es');
}]).run(["$FB", function($FB){
  $FB.init('1414293935539684');
}]);

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
angular.module('core')
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['/lib/modernizr/modernizr.js'],
      'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                             '/lib/simple-line-icons/css/simple-line-icons.css']
    },
    // Angular based script (use the right module name)
    modules: [
      // { name: 'toaster', files: ['/lib/angularjs-toaster/toaster.js','/lib/angularjs-toaster/toaster.css'] }
    ]

  })
  .constant('angularMomentConfig', {
    //preprocess: 'unix', // optional
    //timezone: 'Europe/London' // optional
  })
;

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

angular.module('core').config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/home');

  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('app', {
      // url: '/',
      abstract: true,
      template: '<div data-ui-view autoscroll="false" ng-class="app.viewAnimation" class="content-wrapper"></div>',
      resolve: helper.resolveFor('modernizr', 'icons')
    })
    .state('app.home', {
      url: '/home',
      // abstract: true,
      // templateUrl: helper.basepath('app.html'),
      templateUrl: 'modules/core/views/home.client.view.html'
    })
    .state('app.timeline', {
      url: '/timeline',
      // abstract: true,
      // templateUrl: helper.basepath('app.html'),
      templateUrl: 'modules/core/views/timeline.client.view.html'
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;

}]);

/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

angular.module('core').controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', 'Authentication',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar, Authentication) {
    "use strict";

    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // Applies animation to main view for the next pages to load
    $timeout(function(){
      $rootScope.mainViewAnimation = $rootScope.app.viewAnimation;
    });

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

    $scope.myInterval = 5000;
    $scope.slides = [
      {
        image: 'modules/core/img/slides/slide1.jpg',
        title: "title 1",
        text: "text 1"
      },{
        image: 'modules/core/img/slides/slide2.jpg',
        title: "title 2",
        text: "text 2"
      },{
        image: 'modules/core/img/slides/slide3.jpg',
        title: "title 3",
        text: "text 3"
      }
    ];

}]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// Home controller logic
		// ...

		$scope.authentication = Authentication;

		$scope.checkAuthentication = function(){
			if($scope.authentication && $scope.authentication.user._id){
				console.log($location);
				var currentLocation = $location.path();
				if(currentLocation != '/pets'){
					$location.path('/pets');
				}
			}
		};
	}
]);

'use strict';

angular.module('core').controller('SidebarController',
  ['$rootScope', '$scope', '$state', 'Authentication', 'Menus', 'Utils',
  function($rootScope, $scope, $state,  Authentication, Menus, Utils) {

    $scope.authentication = Authentication;
    $scope.menu = Menus.getMenu('sidebar');

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        collapseList[$index] = !collapseList[$index];
        closeAllBut($index);
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
    
      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

  }
]);

'use strict';

angular.module('core').controller('TimelineController', ['$scope',
	function($scope) {
		// Timeline controller logic
		// ...
	}
]);
'use strict';

angular.module('core').directive('fbPagePlugin', [
	function() {
		return {
			templateUrl: '/modules/core/views/partials/fb-page-plugin.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Fb page plugin directive logic
				// ...
			}
		};
	}
]);

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

angular.module('core').directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

/* jshint -W026 */
angular.module('core').directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  'use strict';
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
'use strict';

angular.module('core').directive('simpleDateInput', [
	function() {
		return {
			templateUrl: 'modules/core/views/partials/simple-date-input.client.view.html',
      scope: {
        date: '='
      },
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

        scope.today = function() {
          $scope.yearOfBirth = new Date();
        };
        //$scope.today();

        scope.clear = function () {
          scope.yearOfBirth = null;
        };

        // Disable weekend selection
        //scope.disabled = function(date, mode) {
        //  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        //};

        scope.toggleMin = function() {
          scope.minDate = scope.minDate ? null : '01/01/1970';
        };
        scope.toggleMin();

        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          scope.opened = true;
        };

        scope.dateOptions = {
          formatYear: 'yyyy',
          startingDay: 1
        };

        scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];

        return false;
			}
		};
	}
]);

/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

angular.module('core').directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);

angular.module('core').service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
angular.module('core').factory('colors', ['APP_COLORS', function(colors) {
  'use strict';
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position,
																iconClass, translateKey, alert) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender,
				iconClass: iconClass || 'fa fa-file-o',
				translate: translateKey,
				alert: alert
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		//Adding the sidebar menu
		this.addMenu('sidebar');
	}
]);
/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
angular.module('core').service('navSearch', function() {
  'use strict';
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

/* jshint -W026 */
/* jshint -W003 */
angular.module('core').provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

angular.module('core').service('toggleStateService', ['$rootScope', function($rootScope) {
  'use strict';
  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

angular.module('core').service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
          var transitionEnd = (function() {

            var element = document.body || document.documentElement,
              transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
              }, name;

            for (name in transEndEventNames) {
              if (element.style[name] !== undefined) return transEndEventNames[name];
            }
          }());

          return transitionEnd && { end: transitionEnd };
        })(),
        animation: (function() {
          var animationEnd = (function() {

            var element = document.body || document.documentElement,
              animEndEventNames = {
                WebkitAnimation: 'webkitAnimationEnd',
                MozAnimation: 'animationend',
                OAnimation: 'oAnimationEnd oanimationend',
                animation: 'animationend'
              }, name;

            for (name in animEndEventNames) {
              if (element.style[name] !== undefined) return animEndEventNames[name];
            }
          }());

          return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || //IE 10
            (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
          return false;
        }

        var window_left = $win.scrollLeft(),
            window_top  = $win.scrollTop(),
            offset      = $element.offset(),
            left        = offset.left,
            top         = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
          return true;
        } else {
          return false;
        }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);
'use strict';

// Configuring the Articles module
angular.module('events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Eventos', 'eventos', 'dropdown', '/events(/create)?', false, null, null, 'fa fa-calendar');
		/*Menus.addSubMenuItem('sidebar', 'events', 'List Events', 'events');*/
		/*Menus.addSubMenuItem('sidebar', 'events', 'Nuevo Evento', 'events/create', false);*/
	}
]);

'use strict';

//Setting up route
angular.module('events').config(['$stateProvider',
	function($stateProvider) {
		// Events state routing
		$stateProvider.
		state('app.listEvents', {
			url: '/eventos',
			templateUrl: 'modules/events/views/list-events.client.view.html'
		}).
		state('app.createEvent', {
			url: '/events/create',
			templateUrl: 'modules/events/views/create-event.client.view.html'
		}).
		state('app.viewEvent', {
			url: '/eventos/:eventId',
			templateUrl: 'modules/events/views/view-event.client.view.html'
		}).
		state('app.viewEventBySlug', {
			url: '/evento/:slug',
			templateUrl: 'modules/events/views/view-event.client.view.html'
		}).
		state('app.editEvent', {
			url: '/events/:eventId/edit',
			templateUrl: 'modules/events/views/edit-event.client.view.html'
		});
	}
]);

'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Upload', 'Events',
	function($scope, $stateParams, $location, Authentication, Upload, Events) {
		$scope.authentication = Authentication;

		// Create new Event
		$scope.create = function() {

			console.log(fullDate);
			// Create new Event object
			var event = new Events ({
				title: this.title,
				image: this.image,
				date: parseDate(this.date, this.dateTime),
				content: this.content
			});

			$scope.formBusy = true;

			// Redirect after save
			Upload.parse(event).then(function () {
				event.$save(function(response) {
					$location.path('events/' + response._id);

					// Clear form fields
					$scope.title = '';
					$scope.image = '';
					$scope.content = '';
					$scope.date = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
					$scope.error = errorResponse.data.message;
				});
			});
		};

		function parseDate(date, dateTime){

			var fullDate = date;
			fullDate.setHours(dateTime.getHours());
			fullDate.setMinutes(dateTime.getMinutes());

			return fullDate;

		}

		// Remove existing Event
		$scope.remove = function(event) {
			if ( event ) { 
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events [i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;

			event.date = parseDate(event.date, event.dateTime);

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Events
		$scope.find = function() {
			$scope.events = Events.query();
		};

		// Find existing Event
		$scope.findOne = function() {
			$scope.event = Events.get({ 
				eventId: $stateParams.eventId
			});
		};

		/*Date directive */
		$scope.today = function() {
			$scope.yearOfBirth = new Date();
		};

		$scope.clear = function () {
			$scope.yearOfBirth = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			//return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : '01/01/1970';
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yyyy',
			startingDay: 1,
			linkFormat: "yyyy-mm-dd",
			pickTime: true,
			pick12HourFormat: true
		};

		//$scope.dateTime;
		$scope.hstep = 1;
		$scope.mstep = 1;
		$scope.ismeridian = true;
		$scope.toggleMode = function() {
			$scope.ismeridian = ! $scope.ismeridian;
		};

		$scope.timeChanged = function(){
			console.log($scope.date);
		};

		$scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd-MM-yyyy HH:mm:ss', 'dd MM yyyy - hh:ii'];
		$scope.format = $scope.formats[1];


	}
]);

'use strict';

//Events service used to communicate Events REST endpoints
angular.module('events').factory('Events', ['$resource',
	function($resource) {
		return $resource('events/:eventId', { eventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('faqs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Preguntas frecuentes', 'faqs', 'dropdown', '/faqs(/create)?', true, null, null, 'icon-info');
		/*Menus.addSubMenuItem('sidebar', 'faqs', 'List Faqs', 'faqs');*/
		/*Menus.addSubMenuItem('sidebar', 'faqs', 'New Faq', 'faqs/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('faqs').config(['$stateProvider',
	function($stateProvider) {
		// Faqs state routing
		$stateProvider.
		state('app.listFaqs', {
			url: '/faqs',
			templateUrl: 'modules/faqs/views/list-faqs.client.view.html'
		}).
		state('app.createFaq', {
			url: '/faqs/create',
			templateUrl: 'modules/faqs/views/create-faq.client.view.html'
		}).
		state('app.viewFaq', {
			url: '/faqs/:faqId',
			templateUrl: 'modules/faqs/views/view-faq.client.view.html'
		}).
		state('app.editFaq', {
			url: '/faqs/:faqId/edit',
			templateUrl: 'modules/faqs/views/edit-faq.client.view.html'
		});
	}
]);

'use strict';

// Faqs controller
angular.module('faqs').controller('FaqsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Faqs',
	function($scope, $stateParams, $location, Authentication, Faqs) {
		$scope.authentication = Authentication;

		// Create new Faq
		$scope.create = function() {
			// Create new Faq object
			var faq = new Faqs ({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			faq.$save(function(response) {
				$location.path('faqs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Faq
		$scope.remove = function(faq) {
			if ( faq ) { 
				faq.$remove();

				for (var i in $scope.faqs) {
					if ($scope.faqs [i] === faq) {
						$scope.faqs.splice(i, 1);
					}
				}
			} else {
				$scope.faq.$remove(function() {
					$location.path('faqs');
				});
			}
		};

		// Update existing Faq
		$scope.update = function() {
			var faq = $scope.faq;

			faq.$update(function() {
				$location.path('faqs/' + faq._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Faqs
		$scope.find = function() {
			$scope.faqs = Faqs.query();
		};

		// Find existing Faq
		$scope.findOne = function() {
			$scope.faq = Faqs.get({ 
				faqId: $stateParams.faqId
			});
		};
	}
]);

'use strict';

//Faqs service used to communicate Faqs REST endpoints
angular.module('faqs').factory('Faqs', ['$resource',
	function($resource) {
		return $resource('faqs/:faqId', { faqId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/*
'use strict';

// Configuring the Articles module
angular.module('imageuploaders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Imageuploaders', 'imageuploaders', 'dropdown', '/imageuploaders(/create)?');
		Menus.addSubMenuItem('sidebar', 'imageuploaders', 'List Imageuploaders', 'imageuploaders');
		Menus.addSubMenuItem('sidebar', 'imageuploaders', 'New Imageuploader', 'imageuploaders/create');
	}
]);*/

'use strict';

//Setting up route
angular.module('imageuploaders').config(['$stateProvider',
	function($stateProvider) {
		// Imageuploaders state routing
		$stateProvider.
		state('listImageuploaders', {
			url: '/imageuploaders',
			templateUrl: 'modules/imageuploaders/views/list-imageuploaders.client.view.html'
		}).
		state('createImageuploader', {
			url: '/imageuploaders/create',
			templateUrl: 'modules/imageuploaders/views/create-imageuploader.client.view.html'
		}).
		state('viewImageuploader', {
			url: '/imageuploaders/:imageuploaderId',
			templateUrl: 'modules/imageuploaders/views/view-imageuploader.client.view.html'
		}).
		state('editImageuploader', {
			url: '/imageuploaders/:imageuploaderId/edit',
			templateUrl: 'modules/imageuploaders/views/edit-imageuploader.client.view.html'
		});
	}
]);

'use strict';

// Imageuploaders controller
angular.module('imageuploaders').controller('ImageuploadersController', [
  '$scope', '$stateParams', '$location', 'Authentication', 'Upload', '$http',
	function($scope, $stateParams, $location, Authentication, Upload, $http) {
		$scope.authentication = Authentication;
	}
]).directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.$apply(function () {
            scope.fileread = changeEvent.target.files[0];
            // or all selected files:
            // scope.fileread = changeEvent.target.files;
          });
        });
      }
    };
  }]);

'use strict';

angular.module('imageuploaders')
	.filter('cloudinaryProfile', [
		function() {
			return function(input) {
				// Cloudinary directive logic
				// ...
        if (!input) return;
				var res = input.split("/upload/");
				input = res[0]+ '/upload/w_150,h_150,c_thumb/' + res[1];
				return input;
			};
		}
	])
	.filter('cloudinaryProfileBlured', [
		function() {
			return function(input) {
				// Cloudinary directive logic
				// ...
        if (!input) return;
				var res = input.split("/upload/");
				input = res[0]+ '/upload/w_250,h_250,c_thumb,e_blur:500/' + res[1];
				return input;
			};
		}
	]);

'use strict';

//Imageuploaders service used to communicate Imageuploaders REST endpoints
angular.module('imageuploaders').factory('Upload', ['$window','$q','Restangular', function ($window, $q, Restangular) {
  return {
    parse: function (fields) {

      var result = $q.defer(),
        requests = [],
        that = this;

      angular.forEach(fields, function (fieldData, field) {
        var deferred = $q.defer(), data;
        if (fieldData instanceof $window.File) {
          requests.push(deferred.promise);
          data = new FormData();
          data.append('file', fieldData);
          if (fieldData.imageProvider) {
            data.append('imageProvider', fieldData.imageProvider);
          }

          Restangular
            .one('upload')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(data, null, {}, {'Content-Type': undefined})
            .then(function (file) {
              fields[field] = file.url;
              deferred.resolve();
            });
        } else if (fieldData !== null && typeof fieldData === 'object') {
          requests.push(deferred.promise);
          that.parse(fields[field]).then(function () {
            deferred.resolve();
          });
        }
      });

      $q.all(requests).then(function () {
        result.resolve();
      });

      return result.promise;
    }
  };
}]);

/*
'use strict';

// Configuring the Articles module
angular.module('issues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('offsidebar', 'Issues', 'issues', 'dropdown', '/issues(/create)?');
		Menus.addSubMenuItem('offsidebar', 'issues', 'List Issues', 'issues');
		Menus.addSubMenuItem('offsidebar', 'issues', 'New Issue', 'issues/create');
	}
]);*/

'use strict';

//Setting up route
angular.module('issues').config(['$stateProvider',
	function($stateProvider) {
		// Issues state routing
		$stateProvider.
		state('app.listIssues', {
			url: '/issues',
			templateUrl: 'modules/issues/views/list-issues.client.view.html'
		}).
		state('app.createIssue', {
			url: '/issues/create',
			templateUrl: 'modules/issues/views/create-issue.client.view.html'
		}).
		state('app.viewIssue', {
			url: '/issues/:issueId',
			templateUrl: 'modules/issues/views/view-issue.client.view.html'
		}).
		state('app.editIssue', {
			url: '/issues/:issueId/edit',
			templateUrl: 'modules/issues/views/edit-issue.client.view.html'
		});
	}
]);

'use strict';

// Issues controller
angular.module('issues').controller('IssuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Issues', 'Upload',
	function($scope, $stateParams, $location, Authentication, Issues, Upload) {
		$scope.authentication = Authentication;

		// Create new Issue
		$scope.create = function() {
			// Create new Issue object
			var issue = new Issues ({
				title: this.title,
				image: this.image,
				description: this.description
			});

			$scope.formBusy = true;

			// Redirect after save
			Upload.parse(issue).then(function () {
				issue.$save(function(response) {
					$location.path('issues/' + response._id);

					// Clear form fields
					$scope.title = '';
					$scope.image = '';
					$scope.description = '';
				}, function(errorResponse) {
					$scope.formBusy = false;
					$scope.error = errorResponse.data.message;
				});
			});

		};

		// Remove existing Issue
		$scope.remove = function(issue) {
			if ( issue ) { 
				issue.$remove();

				for (var i in $scope.issues) {
					if ($scope.issues [i] === issue) {
						$scope.issues.splice(i, 1);
					}
				}
			} else {
				$scope.issue.$remove(function() {
					$location.path('issues');
				});
			}
		};

		// Update existing Issue
		$scope.update = function() {
			var issue = $scope.issue;

			$scope.formBusy = true;
			issue.$update(function() {
				$location.path('issues/' + issue._id);
			}, function(errorResponse) {
				$scope.formBusy = false;
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Issues
		$scope.find = function() {
			$scope.issues = Issues.query();
		};

		// Find existing Issue
		$scope.findOne = function() {
			$scope.issue = Issues.get({ 
				issueId: $stateParams.issueId
			});
		};
	}
]);

'use strict';

//Issues service used to communicate Issues REST endpoints
angular.module('issues').factory('Issues', ['$resource',
	function($resource) {
		return $resource('issues/:issueId', { issueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/*
'use strict';

// Configuring the Articles module
angular.module('notifications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Notifications', 'notifications', 'dropdown', '/notifications(/create)?');
		Menus.addSubMenuItem('sidebar', 'notifications', 'List Notifications', 'notifications');
		Menus.addSubMenuItem('sidebar', 'notifications', 'New Notification', 'notifications/create');
	}
]);*/

'use strict';

//Setting up route
angular.module('notifications').config(['$stateProvider',
	function($stateProvider) {
		// Notifications state routing
		$stateProvider.
		state('app.listNotifications', {
			url: '/notifications',
			templateUrl: 'modules/notifications/views/list-notifications.client.view.html'
		}).
		state('app.createNotification', {
			url: '/notifications/create',
			templateUrl: 'modules/notifications/views/create-notification.client.view.html'
		}).
		state('app.viewNotification', {
			url: '/notifications/:notificationId',
			templateUrl: 'modules/notifications/views/view-notification.client.view.html'
		}).
		state('app.editNotification', {
			url: '/notifications/:notificationId/edit',
			templateUrl: 'modules/notifications/views/edit-notification.client.view.html'
		});
	}
]);

'use strict';

// Notifications controller
angular.module('notifications').controller('NotificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notifications',
	function($scope, $stateParams, $location, Authentication, Notifications) {
		$scope.authentication = Authentication;

		// Create new Notification
		$scope.create = function() {
			// Create new Notification object
			var notification = new Notifications ({
				name: this.name
			});

			// Redirect after save
			notification.$save(function(response) {
				$location.path('notifications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notification
		$scope.remove = function(notification) {
			if ( notification ) { 
				notification.$remove();

				for (var i in $scope.notifications) {
					if ($scope.notifications [i] === notification) {
						$scope.notifications.splice(i, 1);
					}
				}
			} else {
				$scope.notification.$remove(function() {
					$location.path('notifications');
				});
			}
		};

		// Update existing Notification
		$scope.update = function() {
			var notification = $scope.notification;

			notification.$update(function() {
				$location.path('notifications/' + notification._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notifications
		$scope.find = function() {
			$scope.notifications = Notifications.query();
		};

		// Find existing Notification
		$scope.findOne = function() {
			$scope.notification = Notifications.get({ 
				notificationId: $stateParams.notificationId
			});
		};
	}
]);
'use strict';

//Notifications service used to communicate Notifications REST endpoints
angular.module('notifications').factory('Notifications', ['$resource',
	function($resource) {
		return $resource('notifications/:notificationId', { notificationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
/*
angular.module('petgenres').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Petgenres', 'petgenres', 'dropdown', '/petgenres(/create)?');
		Menus.addSubMenuItem('sidebar', 'petgenres', 'List Petgenres', 'petgenres');
		Menus.addSubMenuItem('sidebar', 'petgenres', 'New Petgenre', 'petgenres/create');
	}
]);*/

'use strict';

//Setting up route
angular.module('petgenres').config(['$stateProvider',
	function($stateProvider) {
		// Petgenres state routing
		$stateProvider.
		state('listPetgenres', {
			url: '/petgenres',
			templateUrl: 'modules/petgenres/views/list-petgenres.client.view.html'
		}).
		state('createPetgenre', {
			url: '/petgenres/create',
			templateUrl: 'modules/petgenres/views/create-petgenre.client.view.html'
		}).
		state('viewPetgenre', {
			url: '/petgenres/:petgenreId',
			templateUrl: 'modules/petgenres/views/view-petgenre.client.view.html'
		}).
		state('editPetgenre', {
			url: '/petgenres/:petgenreId/edit',
			templateUrl: 'modules/petgenres/views/edit-petgenre.client.view.html'
		});
	}
]);
'use strict';

// Petgenres controller
angular.module('petgenres').controller('PetgenresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Petgenres',
	function($scope, $stateParams, $location, Authentication, Petgenres) {
		$scope.authentication = Authentication;

		// Create new Petgenre
		$scope.create = function() {
			// Create new Petgenre object
			var petgenre = new Petgenres ({
				name: this.name
			});

			// Redirect after save
			petgenre.$save(function(response) {
				$location.path('petgenres/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Petgenre
		$scope.remove = function(petgenre) {
			if ( petgenre ) { 
				petgenre.$remove();

				for (var i in $scope.petgenres) {
					if ($scope.petgenres [i] === petgenre) {
						$scope.petgenres.splice(i, 1);
					}
				}
			} else {
				$scope.petgenre.$remove(function() {
					$location.path('petgenres');
				});
			}
		};

		// Update existing Petgenre
		$scope.update = function() {
			var petgenre = $scope.petgenre;

			petgenre.$update(function() {
				$location.path('petgenres/' + petgenre._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Petgenres
		$scope.find = function() {
			$scope.petgenres = Petgenres.query();
		};

		// Find existing Petgenre
		$scope.findOne = function() {
			$scope.petgenre = Petgenres.get({ 
				petgenreId: $stateParams.petgenreId
			});
		};
	}
]);
'use strict';

angular.module('petgenres').directive('petGenreSelector', [ 'Petgenres', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			templateUrl: '/modules/petgenres/views/partials/pet-genre-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getGenres = function(){
					console.log('getGenres');
					if(scope.$storage.petgenres && scope.$storage.petgenres.length){
						scope.petgenres = scope.$storage.petgenres;
						console.log('$localStorage', scope.petgenres);
					} else {
						scope.petgenres = Petgenres.query();
						scope.$storage.petgenres = scope.petgenres;
						console.log('else', scope.petgenres);
					}
				};

				scope.getGenres();
			}
		};
	}
]);

'use strict';

//Petgenres service used to communicate Petgenres REST endpoints
angular.module('petgenres').factory('Petgenres', ['$resource',
	function($resource) {
		return $resource('petgenres/:petgenreId', { petgenreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Mascotas', 'pets', 'dropdown', '/pets(/create)?', false, null, null, 'fa fa-paw');
		/*Menus.addSubMenuItem('sidebar', 'pets', 'Mis Mascotas', 'pets/top', false, null, null, 'icon-user');*/
		/*Menus.addSubMenuItem('sidebar', 'pets', 'Ranking', 'pets/', false, null, null, 'icon-trophy');*/
		/*Menus.addSubMenuItem('sidebar', 'pets', 'Mis amigos', 'pets/', false, null, null, 'icon-trophy');*/
		Menus.addSubMenuItem('sidebar', 'pets', 'Perdidos', 'pets/perdidos', false, null, null, 'icon-alert');
		Menus.addSubMenuItem('sidebar', 'pets', 'Adoptar', 'pets/adopcion', false, null, null, 'icon-heart');
		Menus.addSubMenuItem('sidebar', 'pets', 'Nueva Mascota', 'pets/create', false, null, null, 'fa-plus-circle');
	}
]);

'use strict';

//Setting up route
angular.module('pets').config(['$stateProvider',
	function($stateProvider) {
		// Pets state routing
		$stateProvider.
		state('qr', {
			url: '/qr',
			templateUrl: 'modules/pets/views/qr.client.view.html'
		}).
		state('app.listPets', {
		  url: '/pets',
		  templateUrl: 'modules/pets/views/list-pets.client.view.html',
		  controller: 'PetsController'
		}).
		state('app.listPetsAdoption', {
			url: '/pets/adopcion',
			templateUrl: 'modules/pets/views/list-pets-adoption.client.view.html',
			controller: 'PetsController'
		}).
		state('app.listPetsMissing', {
			url: '/pets/perdidos',
			templateUrl: 'modules/pets/views/list-pets-missing.client.view.html',
			controller: 'PetsController'
		}).
		state('app.createPet', {
			url: '/pets/create',
			templateUrl: 'modules/pets/views/create-pet.client.view.html'
		}).
		state('app.viewPet', {
			url: '/pet/:petSlug',
			templateUrl: 'modules/pets/views/view-pet.client.view.html',
			controller: 'PetsController'
		}).
		state('app.viewPets', {
			url: '/pets/:petId',
			templateUrl: 'modules/pets/views/view-pets.client.view.html',
			controller: 'PetsController'
		}).
		state('app.editPet', {
			url: '/pets/:petId/edit',
			templateUrl: 'modules/pets/views/edit-pet.client.view.html'
		});
	}
]);

'use strict';

// Pets controller
angular.module('pets').controller('PetsController', ['$scope', '$resource', '$stateParams', '$location', 'Authentication', 'Pets', 'Upload', 'geolocation', 'Notifications', '$http', '$timeout',
	function($scope, $resource, $stateParams, $location, Authentication, Pets, Upload, geolocation, Notifications, $http, $timeout) {
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

    $scope.getGeoLocalization = function () {
      geolocation.getLocation().then(function (data) {
        $scope.currentCoords = {latitude: data.coords.latitude, longitude: data.coords.longitude};
        $scope.setGeoLocation();
      });
    };


      //END MAPS

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

'use strict';

angular.module('pets').directive('petList', [
	function() {
		return {
			templateUrl: 'modules/pets/views/partials/pet-list.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
        return;
      }
		};
	}
]);

'use strict';

angular.module('pets').directive('petProfileView', [
	function() {
		return {
      templateUrl: 'modules/pets/views/partials/pet-profile-view.client.view.html',
			restrict: 'E',
      replace: true,
			link: function postLink(scope, element, attrs) {
        return;
			}
		};
	}
]);

'use strict';

angular.module('pets').directive('qr',[ '$http',
	function($http) {
		return {
			templateUrl: '/modules/pets/views/qr.client.view.html',
			restrict: 'E',
			replace: true,
			scope: {
				pet: '='
			},
			link: function postLink(scope, element, attr) {

        element.bind('click', function() {
          var popupWin = window.open('', '_blank', 'width=300,height=300');
          popupWin.document.open();
          popupWin.document.write('<html><head></head><body onload="window.print()">' + element.html() + '</html>');
          popupWin.document.close();
        });


          scope.svg = "";

				$http.get('/qr/' + scope.pet.slug).
					success(function(data, status, headers, config) {
						// this callback will be called asynchronously
						// when the response is available
						scope.svg = data;
					}).
					error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						console.log('ERROR');
					});

			}
		};
	}
]);

(function (angular) {
  function printDirective() {
    var printSection = document.getElementById('printSection');
    // if there is no printing section, create one
    if (!printSection) {
      printSection = document.createElement('div');
      printSection.id = 'printSection';
      document.body.appendChild(printSection);
    }
    function link(scope, element, attrs) {

      element.on('click', function () {
        var elemToPrint = document.getElementById(attrs.printElementId);
        if (elemToPrint) {
          printElement(elemToPrint);
        }
      });
      window.onafterprint = function () {
        // clean the print section before adding new content
        printSection.innerHTML = '';
      }
    }
    function printElement(elem) {
      	// clones the element you want to print
      	var domClone = elem.cloneNode(true);

		printSection.appendChild(domClone);
      	window.print();
    }
    return {
      link: link,
      restrict: 'A'
    };
  }
  angular.module('core').directive('ngPrint', [printDirective]);
}(window.angular));;

'use strict';

//Pets service used to communicate Pets REST endpoints
angular.module('pets').factory('Pets', ['$resource',
	function($resource) {
		return $resource('pets/:petId', { petId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
/*
angular.module('pettypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Pettypes', 'pettypes', 'dropdown', '/pettypes(/create)?');
		Menus.addSubMenuItem('sidebar', 'pettypes', 'List Pettypes', 'pettypes');
		Menus.addSubMenuItem('sidebar', 'pettypes', 'New Pettype', 'pettypes/create');
	}
]);*/

'use strict';

//Setting up route
angular.module('pettypes').config(['$stateProvider',
	function($stateProvider) {
		// Pettypes state routing
		$stateProvider.
		state('listPettypes', {
			url: '/pettypes',
			templateUrl: 'modules/pettypes/views/list-pettypes.client.view.html'
		}).
		state('createPettype', {
			url: '/pettypes/create',
			templateUrl: 'modules/pettypes/views/create-pettype.client.view.html'
		}).
		state('viewPettype', {
			url: '/pettypes/:pettypeId',
			templateUrl: 'modules/pettypes/views/view-pettype.client.view.html'
		}).
		state('editPettype', {
			url: '/pettypes/:pettypeId/edit',
			templateUrl: 'modules/pettypes/views/edit-pettype.client.view.html'
		});
	}
]);
'use strict';

// Pettypes controller
angular.module('pettypes').controller('PettypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pettypes',
	function($scope, $stateParams, $location, Authentication, Pettypes) {
		$scope.authentication = Authentication;

		// Create new Pettype
		$scope.create = function() {
			// Create new Pettype object
			var pettype = new Pettypes ({
				name: this.name
			});

			// Redirect after save
			pettype.$save(function(response) {
				$location.path('pettypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pettype
		$scope.remove = function(pettype) {
			if ( pettype ) { 
				pettype.$remove();

				for (var i in $scope.pettypes) {
					if ($scope.pettypes [i] === pettype) {
						$scope.pettypes.splice(i, 1);
					}
				}
			} else {
				$scope.pettype.$remove(function() {
					$location.path('pettypes');
				});
			}
		};

		// Update existing Pettype
		$scope.update = function() {
			var pettype = $scope.pettype;

			pettype.$update(function() {
				$location.path('pettypes/' + pettype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pettypes
		$scope.find = function() {
			$scope.pettypes = Pettypes.query();
		};

		// Find existing Pettype
		$scope.findOne = function() {
			$scope.pettype = Pettypes.get({ 
				pettypeId: $stateParams.pettypeId
			});
		};
	}
]);
'use strict';

angular.module('petgenres').directive('petTypeSelector', [ 'Pettypes', '$localStorage',
	function(Pettypes, $localStorage) {
		return {
			templateUrl: '/modules/pettypes/views/partials/pet-type-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getTypes = function(){
					console.log('getTypes');
					if(scope.$storage.pettypes && scope.$storage.pettypes.length){
						scope.pettypes = scope.$storage.pettypes;
						console.log('$localStorage', scope.pettypes);
					} else {
						scope.pettypes = Pettypes.query();
						scope.$storage.pettypes = scope.pettypes;
						console.log('else', scope.pettypes);
					}
				};

				scope.getTypes();
			}
		};
	}
]);


'use strict';

//Pettypes service used to communicate Pettypes REST endpoints
angular.module('pettypes').factory('Pettypes', ['$resource',
	function($resource) {
		return $resource('pettypes/:pettypeId', { pettypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('rescues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Voluntarios', 'rescues', 'dropdown', '/rescues(/create)?', false, null, null, 'fa fa-group');*/
		Menus.addMenuItem('sidebar', 'Voluntarios', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-group');
		/*Menus.addSubMenuItem('sidebar', 'rescues', 'List Rescues', 'rescues');
		Menus.addSubMenuItem('sidebar', 'rescues', 'New Rescue', 'rescues/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('rescues').config(['$stateProvider',
	function($stateProvider) {
		// Rescues state routing
		$stateProvider.
		state('app.listRescues', {
			url: '/rescues',
			templateUrl: 'modules/rescues/views/list-rescues.client.view.html'
		}).
		state('app.createRescue', {
			url: '/rescues/create',
			templateUrl: 'modules/rescues/views/create-rescue.client.view.html'
		}).
		state('app.viewRescue', {
			url: '/rescues/:rescueId',
			templateUrl: 'modules/rescues/views/view-rescue.client.view.html'
		}).
		state('app.editRescue', {
			url: '/rescues/:rescueId/edit',
			templateUrl: 'modules/rescues/views/edit-rescue.client.view.html'
		});
	}
]);

'use strict';

// Rescues controller
angular.module('rescues').controller('RescuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rescues',
	function($scope, $stateParams, $location, Authentication, Rescues) {
		$scope.authentication = Authentication;

		// Create new Rescue
		$scope.create = function() {
			// Create new Rescue object
			var rescue = new Rescues ({
				name: this.name
			});

			// Redirect after save
			rescue.$save(function(response) {
				$location.path('rescues/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Rescue
		$scope.remove = function(rescue) {
			if ( rescue ) { 
				rescue.$remove();

				for (var i in $scope.rescues) {
					if ($scope.rescues [i] === rescue) {
						$scope.rescues.splice(i, 1);
					}
				}
			} else {
				$scope.rescue.$remove(function() {
					$location.path('rescues');
				});
			}
		};

		// Update existing Rescue
		$scope.update = function() {
			var rescue = $scope.rescue;

			rescue.$update(function() {
				$location.path('rescues/' + rescue._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rescues
		$scope.find = function() {
			$scope.rescues = Rescues.query();
		};

		// Find existing Rescue
		$scope.findOne = function() {
			$scope.rescue = Rescues.get({ 
				rescueId: $stateParams.rescueId
			});
		};
	}
]);
'use strict';

//Rescues service used to communicate Rescues REST endpoints
angular.module('rescues').factory('Rescues', ['$resource',
	function($resource) {
		return $resource('rescues/:rescueId', { rescueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('roles').config(['$stateProvider',
	function($stateProvider) {
		// Roles state routing
		$stateProvider.
		state('app.listRoles', {
			url: '/roles',
			templateUrl: 'modules/roles/views/list-roles.client.view.html'
		}).
		state('app.createRole', {
			url: '/roles/create',
			templateUrl: 'modules/roles/views/create-role.client.view.html'
		}).
		state('app.viewRole', {
			url: '/roles/:roleId',
			templateUrl: 'modules/roles/views/view-role.client.view.html'
		}).
		state('app.editRole', {
			url: '/roles/:roleId/edit',
			templateUrl: 'modules/roles/views/edit-role.client.view.html'
		});
	}
]);

'use strict';

// Roles controller
angular.module('roles').controller('RolesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Roles',
	function($scope, $stateParams, $location, Authentication, Roles) {
		$scope.authentication = Authentication;

		// Create new Role
		$scope.create = function() {
			// Create new Role object
			var role = new Roles ({
				name: this.name
			});

			// Redirect after save
			role.$save(function(response) {
				$location.path('roles/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Role
		$scope.remove = function(role) {
			if ( role ) { 
				role.$remove();

				for (var i in $scope.roles) {
					if ($scope.roles [i] === role) {
						$scope.roles.splice(i, 1);
					}
				}
			} else {
				$scope.role.$remove(function() {
					$location.path('roles');
				});
			}
		};

		// Update existing Role
		$scope.update = function() {
			var role = $scope.role;

			role.$update(function() {
				$location.path('roles/' + role._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Roles
		$scope.find = function() {
			$scope.roles = Roles.query();
		};

		// Find existing Role
		$scope.findOne = function() {
			$scope.role = Roles.get({ 
				roleId: $stateParams.roleId
			});
		};
	}
]);
'use strict';

angular.module('roles').directive('roleUserSelector', [ 'Roles', '$localStorage',
	function(Petgenres, $localStorage) {
		return {
			templateUrl: '/modules/roles/views/partials/role-user-selector.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$storage = $localStorage;

				scope.getRoleUsers = function(){
					console.log('roleUser');
					if(scope.$storage.roleusers && scope.$storage.roleusers.length){
						scope.roleusers = scope.$storage.roleusers;
						console.log('$localStorage', scope.roleusers);
					} else {
						scope.roleusers = Petgenres.query();
						scope.$storage.roleusers = scope.roleusers;
						console.log('else', scope.roleusers);
					}
				};

				scope.getRoleUsers();
			}
		};
	}
]);

'use strict';

//Roles service used to communicate Roles REST endpoints
angular.module('roles').factory('Roles', ['$resource',
	function($resource) {
		return $resource('roles/:roleId', { roleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('shelters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Refugios', 'shelters', 'dropdown', '/shelters(/create)?', false, null, null, 'icon-pointer');*/
		Menus.addMenuItem('sidebar', 'Refugios', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'icon-pointer');
		/*Menus.addSubMenuItem('sidebar', 'shelters', 'List Shelters', 'shelters');
		Menus.addSubMenuItem('sidebar', 'shelters', 'New Shelter', 'shelters/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('shelters').config(['$stateProvider',
	function($stateProvider) {
		// Shelters state routing
		$stateProvider.
		state('app.listShelters', {
			url: '/shelters',
			templateUrl: 'modules/shelters/views/list-shelters.client.view.html'
		}).
		state('app.createShelter', {
			url: '/shelters/create',
			templateUrl: 'modules/shelters/views/create-shelter.client.view.html'
		}).
		state('app.viewShelter', {
			url: '/shelters/:shelterId',
			templateUrl: 'modules/shelters/views/view-shelter.client.view.html'
		}).
		state('app.editShelter', {
			url: '/shelters/:shelterId/edit',
			templateUrl: 'modules/shelters/views/edit-shelter.client.view.html'
		});
	}
]);

'use strict';

// Shelters controller
angular.module('shelters').controller('SheltersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shelters',
	function($scope, $stateParams, $location, Authentication, Shelters) {
		$scope.authentication = Authentication;

		// Create new Shelter
		$scope.create = function() {
			// Create new Shelter object
			var shelter = new Shelters ({
				name: this.name
			});

			// Redirect after save
			shelter.$save(function(response) {
				$location.path('shelters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Shelter
		$scope.remove = function(shelter) {
			if ( shelter ) { 
				shelter.$remove();

				for (var i in $scope.shelters) {
					if ($scope.shelters [i] === shelter) {
						$scope.shelters.splice(i, 1);
					}
				}
			} else {
				$scope.shelter.$remove(function() {
					$location.path('shelters');
				});
			}
		};

		// Update existing Shelter
		$scope.update = function() {
			var shelter = $scope.shelter;

			shelter.$update(function() {
				$location.path('shelters/' + shelter._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Shelters
		$scope.find = function() {
			$scope.shelters = Shelters.query();
		};

		// Find existing Shelter
		$scope.findOne = function() {
			$scope.shelter = Shelters.get({ 
				shelterId: $stateParams.shelterId
			});
		};
	}
]);
'use strict';

//Shelters service used to communicate Shelters REST endpoints
angular.module('shelters').factory('Shelters', ['$resource',
	function($resource) {
		return $resource('shelters/:shelterId', { shelterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('shops').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Tienda', 'tienda', 'dropdown', '/tienda(/create)?', false, null, null, 'fa fa-shopping-cart');*/
		/*Menus.addSubMenuItem('sidebar', 'shops', 'List Shops', 'shops');
		Menus.addSubMenuItem('sidebar', 'shops', 'New Shop', 'shops/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('shops').config(['$stateProvider',
	function($stateProvider) {
		// Shops state routing
		$stateProvider.
		state('app.listShops', {
			url: '/tienda',
			templateUrl: 'modules/shops/views/list-shops.client.view.html'
		}).
		state('app.createShop', {
			url: '/tienda/create',
			templateUrl: 'modules/shops/views/create-shop.client.view.html'
		}).
		state('app.viewShop', {
			url: '/tienda/:shopId',
			templateUrl: 'modules/shops/views/view-shop.client.view.html'
		}).
		state('app.editShop', {
			url: '/tienda/:shopId/edit',
			templateUrl: 'modules/shops/views/edit-shop.client.view.html'
		});
	}
]);

'use strict';

// Shops controller
angular.module('shops').controller('ShopsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shops',
	function($scope, $stateParams, $location, Authentication, Shops) {
		$scope.authentication = Authentication;

		// Create new Shop
		$scope.create = function() {
			// Create new Shop object
			var shop = new Shops ({
				name: this.name
			});

			// Redirect after save
			shop.$save(function(response) {
				$location.path('shops/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Shop
		$scope.remove = function(shop) {
			if ( shop ) { 
				shop.$remove();

				for (var i in $scope.shops) {
					if ($scope.shops [i] === shop) {
						$scope.shops.splice(i, 1);
					}
				}
			} else {
				$scope.shop.$remove(function() {
					$location.path('shops');
				});
			}
		};

		// Update existing Shop
		$scope.update = function() {
			var shop = $scope.shop;

			shop.$update(function() {
				$location.path('shops/' + shop._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Shops
		$scope.find = function() {
			$scope.shops = Shops.query();
		};

		// Find existing Shop
		$scope.findOne = function() {
			$scope.shop = Shops.get({ 
				shopId: $stateParams.shopId
			});
		};
	}
]);
'use strict';

//Shops service used to communicate Shops REST endpoints
angular.module('shops').factory('Shops', ['$resource',
	function($resource) {
		return $resource('shops/:shopId', { shopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('trainers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Entrenadores', 'trainers', 'dropdown', '/trainers(/create)?', false, null, null, 'fa fa-book');*/
		Menus.addMenuItem('sidebar', 'Entrenadores', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-book');
		/*Menus.addSubMenuItem('sidebar', 'trainers', 'List Trainers', 'trainers');*/
		/*Menus.addSubMenuItem('sidebar', 'trainers', 'New Trainer', 'trainers/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('trainers').config(['$stateProvider',
	function($stateProvider) {
		// Trainers state routing
		$stateProvider.
		state('app.listTrainers', {
			url: '/trainers',
			templateUrl: 'modules/trainers/views/list-trainers.client.view.html'
		}).
		state('app.createTrainer', {
			url: '/trainers/create',
			templateUrl: 'modules/trainers/views/create-trainer.client.view.html'
		}).
		state('app.viewTrainer', {
			url: '/trainers/:trainerId',
			templateUrl: 'modules/trainers/views/view-trainer.client.view.html'
		}).
		state('app.editTrainer', {
			url: '/trainers/:trainerId/edit',
			templateUrl: 'modules/trainers/views/edit-trainer.client.view.html'
		});
	}
]);

'use strict';

// Trainers controller
angular.module('trainers').controller('TrainersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trainers',
	function($scope, $stateParams, $location, Authentication, Trainers) {
		$scope.authentication = Authentication;

		// Create new Trainer
		$scope.create = function() {
			// Create new Trainer object
			var trainer = new Trainers ({
				name: this.name
			});

			// Redirect after save
			trainer.$save(function(response) {
				$location.path('trainers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Trainer
		$scope.remove = function(trainer) {
			if ( trainer ) { 
				trainer.$remove();

				for (var i in $scope.trainers) {
					if ($scope.trainers [i] === trainer) {
						$scope.trainers.splice(i, 1);
					}
				}
			} else {
				$scope.trainer.$remove(function() {
					$location.path('trainers');
				});
			}
		};

		// Update existing Trainer
		$scope.update = function() {
			var trainer = $scope.trainer;

			trainer.$update(function() {
				$location.path('trainers/' + trainer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Trainers
		$scope.find = function() {
			$scope.trainers = Trainers.query();
		};

		// Find existing Trainer
		$scope.findOne = function() {
			$scope.trainer = Trainers.get({ 
				trainerId: $stateParams.trainerId
			});
		};
	}
]);
'use strict';

//Trainers service used to communicate Trainers REST endpoints
angular.module('trainers').factory('Trainers', ['$resource',
	function($resource) {
		return $resource('trainers/:trainerId', { trainerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('app.profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('app.password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('app.accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('app.signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('app.signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('app.forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('app.reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('app.reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('app.reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/pets');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/pets');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('vets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('sidebar', 'Veterinarias', 'vets', 'dropdown', '/vets(/create)?', false, null, null, 'fa fa-medkit');*/
		Menus.addMenuItem('sidebar', 'Veterinarias', 'contacts/create', 'dropdown', '/contacts(/create)?', false, null, null, 'fa fa-medkit');
		/*Menus.addSubMenuItem('sidebar', 'vets', 'List Vets', 'vets');*/
		/*Menus.addSubMenuItem('sidebar', 'vets', 'New Vet', 'vets/create');*/
	}
]);

'use strict';

//Setting up route
angular.module('vets').config(['$stateProvider',
	function($stateProvider) {
		// Vets state routing
		$stateProvider.
		state('app.listVets', {
			url: '/vets',
			templateUrl: 'modules/vets/views/list-vets.client.view.html'
		}).
		state('app.createVet', {
			url: '/vets/create',
			templateUrl: 'modules/vets/views/create-vet.client.view.html'
		}).
		state('app.viewVet', {
			url: '/vets/:vetId',
			templateUrl: 'modules/vets/views/view-vet.client.view.html'
		}).
		state('app.editVet', {
			url: '/vets/:vetId/edit',
			templateUrl: 'modules/vets/views/edit-vet.client.view.html'
		});
	}
]);

'use strict';

// Vets controller
angular.module('vets').controller('VetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vets',
	function($scope, $stateParams, $location, Authentication, Vets) {
		$scope.authentication = Authentication;

		// Create new Vet
		$scope.create = function() {
			// Create new Vet object
			var vet = new Vets ({
				name: this.name
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
		$scope.remove = function(vet) {
			if ( vet ) { 
				vet.$remove();

				for (var i in $scope.vets) {
					if ($scope.vets [i] === vet) {
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
			var vet = $scope.vet;

			vet.$update(function() {
				$location.path('vets/' + vet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vets
		$scope.find = function() {
			$scope.vets = Vets.query();
		};

		// Find existing Vet
		$scope.findOne = function() {
			$scope.vet = Vets.get({ 
				vetId: $stateParams.vetId
			});
		};
	}
]);
'use strict';

//Vets service used to communicate Vets REST endpoints
angular.module('vets').factory('Vets', ['$resource',
	function($resource) {
		return $resource('vets/:vetId', { vetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);