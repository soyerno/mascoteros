'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Event title',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please fill Event image',
	},
	content: {
		type: String,
		default: '',
		required: 'Please fill Event content',
	},
	date:{
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Event', EventSchema);
