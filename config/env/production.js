'use strict';

module.exports = {
	//db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/heroku_app34828065',
  db: 'mongodb://mascoteros:mascoteros@ds033107.mongolab.com:33107/heroku_app34828065',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.min.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
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
				'http://code.angularjs.org/1.0.8/i18n/angular-locale_es-es.js',
				'public/lib/angular-native-picker/build/angular-datepicker.js',
				'public/lib/angular-socialshare/angular-socialshare.js',
				'public/lib/angularjs-geolocation/dist/angularjs-geolocation.min.js',
				'http://platform.twitter.com/widgets.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
				'public/lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
				'public/lib/angular-datepicker/dist/index.js'
			]
		},
		css:  [
			// 'public/modules/**/css/*.css'
			'public/lib/textAngular/src/textAngular.css',
			'public/application.min.css',
			'public/modules/core/css/core.css',
			'public/modules/core/css/landing.css',
			'public/modules/core/css/datePicker.css',
			'public/modules/core/css/offsidebar-tab-1.css',
			'public/modules/pets/css/pet_profile.css',
			'public/modules/pets/css/qr.css',
			'public/lib/angular-native-picker/build/themes/default.css',
			'public/lib/angular-native-picker/build/themes/default.date.css',
			'public/lib/angular-socialshare/angular-socialshare.css',
			'public/lib/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
			'public/lib/angular-datepicker/dist/index.css'

		],
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1414293935539684',
		clientSecret: process.env.FACEBOOK_SECRET || 'fb7c4444f2362a08c14a72c86773662e',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'MohmwkWYsvxFfOdoLVBkwbtSa',
		clientSecret: process.env.TWITTER_SECRET || 'BKRrz647oRuCMDUuJPBMOyAJx0QNGEGnuS44MSMZVca9sw3Dje',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '554617115302-upv638269ep30agei2t7ljo1nkplujlp.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'KOVON0RbaOQwLoPlKLEbdRLz',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
