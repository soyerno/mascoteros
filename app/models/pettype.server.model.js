'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pettype Schema
 */
var PettypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pettype name',
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

mongoose.model('Pettype', PettypeSchema);