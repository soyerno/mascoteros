'use strict';

module.exports = {
	app: {
		title: 'Mascoteros',
		description: 'Todos para las mascotas en un solo lugar',
		keywords: 'mascotas, veterinarias, qr, entrenadores, paseadores, hogares, refugios, tiendas, shops, accesorios, comida, perro, gatos, loro, hamster',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'UA-61665891-1'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
