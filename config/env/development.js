'use strict';

module.exports = {
	db: 'mongodb://localhost/mascoteros-dev',
	//db: 'mongodb://mascoteros:mascoteros@ds051831.mongolab.com:51831/heroku_app34604507',
	app: {
		title: 'Mascoteros - Development Environment'
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
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
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
