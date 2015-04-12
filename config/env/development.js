'use strict';

module.exports = {
	//db: 'mongodb://localhost/mean-dev',
    db: 'mongodb://mascoteros:mascoteros@ds061371.mongolab.com:61371/heroku_app35295284',
	app: {
		title: 'Todo para las mascotas en un solo lugar'
	},
	facebook: {
        clientID: process.env.FACEBOOK_ID || '1428057644163313',
        clientSecret: process.env.FACEBOOK_SECRET || 'c602e9aa95926a4ddbca84f8b7eb5ba3',
        callbackURL: '/api/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'MohmwkWYsvxFfOdoLVBkwbtSa',
        clientSecret: process.env.TWITTER_SECRET || 'BKRrz647oRuCMDUuJPBMOyAJx0QNGEGnuS44MSMZVca9sw3Dje',
        callbackURL: '/api/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || '554617115302-upv638269ep30agei2t7ljo1nkplujlp.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'KOVON0RbaOQwLoPlKLEbdRLz',
        callbackURL: '/api/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: '/api/auth/linkedin/callback'
    },
    github: {
        clientID: process.env.GITHUB_ID || 'APP_ID',
        clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
        callbackURL: '/api/auth/github/callback'
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
