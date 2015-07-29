'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
	Schema = mongoose.Schema;

/**
 * Vet Schema
 */
var VetSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Por favor, ingrese el nombre',
		trim: true
	},
	description: {
		type: String,
		default: '',
		//required: 'Por favor, ingrese el la descripcion',
		trim: true
	},
	email: {
		type: String,
		default: '',
		//required: 'Por favor, ingrese el email',
		trim: true
	},
	tel: {
		type: Schema.Types.Mixed
	},
	servicesList: {
		type: Schema.Types.Mixed
	},
	schedule: {
		type: Schema.Types.Mixed
	},
	address: {
		type: String,
		default: ''
		//required: 'Por favor, ingrese la dirección'
	},
	coords: {
    type: [Number],
    index: '2d'
  },
	created: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: 'Please fill slug name'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

VetSchema.plugin(new URLSlugs('name', {field: 'slug'}));

mongoose.model('Vet', VetSchema);
