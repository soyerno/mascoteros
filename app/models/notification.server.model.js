'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Notification title',
		trim: true
	},
	pet: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	geoLocation: Schema.Types.Mixed,
	created: {
		type: Date,
		default: Date.now
	},
	to: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Notification', NotificationSchema);
