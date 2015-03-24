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
	name: {
		type: String,
		default: '',
		required: 'Please fill Faq name',
		trim: true
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