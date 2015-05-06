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
		required: 'Por favor, ingrese el nombre de la raza',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	pettype: {
		type: Schema.ObjectId,
		ref: 'Pettype',
		required: 'Por favor, ingrese el tipo de mascota'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Petbreed', PetbreedSchema);
