'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vet Schema
 */
var VetSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Vet name',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: 'Por favor, ingrese la dirección'
	},
	coords: {
		type: Schema.Types.Mixed
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

mongoose.model('Vet', VetSchema);
