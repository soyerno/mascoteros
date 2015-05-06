'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Petbreed Schema
 */
var PetbreedSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Petbreed name',
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

mongoose.model('Petbreed', PetbreedSchema);