'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$element', '$timeout', '$state', 'Authentication', 'Menus', '$rootScope',
	function($scope, $element, $timeout, $state, Authentication, Menus, $rootScope) {
		// Expose view variables
		$scope.$state = $state;
		$scope.authentication = Authentication;
		$scope.IS_MOBILE = $rootScope.IS_MOBILE;
		$scope.IS_TABLET = $rootScope.IS_TABLET;
		$scope.IS_DESKTOP = $rootScope.IS_DESKTOP;

		// Get the topbar menu
		$scope.menu = Menus.getMenu('topbar');

		// Toggle the menu items
		$scope.isCollapsed = false;
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
			FB.init({
				appId      : '1414293935539684',
				status     : true,
				xfbml      : true,
				version    : 'v2.3' // or v2.0, v2.1, v2.0
			});
		});

		var hideOffset = 60,
			scrollposition = 0,
			scroll_time;

		function showHeader($el) {
			$el.css({
				'top': 0,
				'transition': 'top 0.10s',
				'-webkit-transition': 'top 0.10s',
				'-moz-transition': 'top 0.10s',
				'-ms-transition': 'top 0.10s',
				'-o-transition': 'top 0.10s'
			});
		}

		angular.element(window).bind($scope.IS_DESKTOP ? 'scroll' : 'touchmove', function() {
			var $el = $element.parent(),
				body = angular.element(document.getElementsByTagName('body')),
				current_scroll = body[0].scrollTop,
				hheight = $el[0].scrollHeight,
				pxOffset = parseInt(hideOffset);

			$timeout.cancel(scroll_time);

			if (current_scroll >= hheight + pxOffset) {
				if (current_scroll <= scrollposition) {
					showHeader($el);
				} else {
					$el.css({
						'top': -hheight + 'px',
						'transition': 'top 0.25s',
						'-webkit-transition': 'top 0.25s',
						'-moz-transition': 'top 0.25s',
						'-ms-transition': 'top 0.25s',
						'-o-transition': 'top 0.25s'
					});
				}
			} else if (current_scroll >= hheight) {
				showHeader($el);
			}

			scroll_time = $timeout(function() {
				scrollposition = body[0].scrollTop;
				showHeader($el);
			}, 500);
		});
	}
]);
