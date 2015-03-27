'use strict';

module.exports = {
	app: {
		title: 'Mascoteros',
		description: 'Somos amigos de las mascotas',
		keywords: 'Mascotas, ID, Directorio, Eventos'
	},
	port: process.env.PORT || 3031,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [

				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/ngstorage/ngStorage.js',
				'public/lib/lodash/dist/lodash.js',
        		'public/lib/restangular/dist/restangular.js',
        		'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap-checkbox-fa/angular-bootstrap-checkbox.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/oclazyload/dist/ocLazyLoad.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-loading-bar/build/loading-bar.js',
				'public/lib/ngstorage/ngStorage.js',
				'public/lib/moment/moment.js',
				'public/lib/angular-moment/angular-moment.js',
				'public/lib/moment/locale/es.js',
				'public/lib/angular-native-picker/build/angular-datepicker.js',
				'public/lib/angular-socialshare/angular-socialshare.js',
				'http://platform.twitter.com/widgets.js'
        		// 'public/lib/jquery/dist/jquery.js',
				// 'public/lib/angular/angular.js',
				// 'public/lib/angular-resource/angular-resource.js',
				// 'public/lib/angular-cookies/angular-cookies.js',
				// 'public/lib/angular-animate/angular-animate.js',
				// 'public/lib/angular-touch/angular-touch.js',
				// 'public/lib/angular-sanitize/angular-sanitize.js',
				// 'public/lib/angular-ui-router/release/angular-ui-router.js',
				// 'public/lib/angular-ui-utils/ui-utils.js',
				// 'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			// 'public/modules/**/css/*.css'
			'public/application.min.css',
			'public/modules/core/css/core.css',
			'public/modules/core/css/landing.css',
			'public/modules/core/css/datePicker.css',
			'public/modules/core/css/offsidebar-tab-1.css',
			'public/modules/pets/css/pet_profile.css',
			'public/modules/pets/css/qr.css',
			'public/lib/angular-native-picker/build/themes/default.css',
			'public/lib/angular-native-picker/build/themes/default.date.css',
			'public/lib/angular-socialshare/angular-socialshare.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
