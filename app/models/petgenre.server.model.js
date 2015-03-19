'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Petgenre Schema
 */
var PetgenreSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Petgenre name',
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

mongoose.model('Petgenre', PetgenreSchema);