'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/Bootflat/css/bootstrap.min.css',
				'public/lib/Bootflat/bootflat/css/bootflat.min.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-datepicker/dist/index.css',
				'public/lib/angular-socialshare/angular-socialshare.css',
				'public/lib/textAngular/src/textAngular.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/animate.css/animate.min.css'
			],
			js: [
				'public/lib/lodash/lodas.min.js',
				'public/lib/angular/angular.js',
				'public/lib/wowjs/dist/wow.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/angular-file-upload.js',
				'public/lib/restangular/dist/restangular.js',
				'public/lib/angularjs-geolocation/dist/angularjs-geolocation.min.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.js',
				'public/lib/angular-datepicker/dist/index.js',
				'public/lib/ngstorage/ngStorage.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/moment/moment.js',
				'public/lib/angular-moment/angular-moment.js',
				'public/lib/moment/locale/es.js',
				'http://platform.twitter.com/widgets.js',
				'public/lib/angular-socialshare/angular-socialshare.js',
				'public/lib/angular-bootstrap-checkbox-fa/angular-bootstrap-checkbox.js'
			],
			tests: ['public/lib/angular-mocks/angular-mocks.js']
		},
		css: [
			'modules/*/client/css/*.css'
		],
		less: [
			'modules/*/client/less/*.less'
		],
		sass: [
			'modules/*/client/scss/*.scss'
		],
		js: [
			'modules/core/client/app/config.js',
			'modules/core/client/app/init.js',
			'modules/*/client/*.js',
			'modules/*/client/**/*.js'
		],
		views: ['modules/*/client/views/**/*.html']
	},
	server: {
		allJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
		models: 'modules/*/server/models/**/*.js',
		routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		sockets: 'modules/*/server/sockets/**/*.js',
		config: 'modules/*/server/config/*.js',
		policies: 'modules/*/server/policies/*.js',
		views: 'modules/*/server/views/*.html'
	}
};
