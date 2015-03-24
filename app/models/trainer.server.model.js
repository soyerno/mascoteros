'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Trainer Schema
 */
var TrainerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Trainer name',
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

mongoose.model('Trainer', TrainerSchema);