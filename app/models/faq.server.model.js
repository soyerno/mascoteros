'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Faq Schema
 */
var FaqSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Faq title',
		trim: true
	},
	content: {
		type: String,
		default: '',
		required: 'Please fill Faq content'
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

mongoose.model('Faq', FaqSchema);
