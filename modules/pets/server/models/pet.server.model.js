
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
	Schema = mongoose.Schema;
/**
 * Pet Schema
 */
var PetSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pet name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	isOwner: {
		type: Boolean,
		default: ''
	},
	owners: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	type: {
		type: Schema.ObjectId,
		ref: 'Pettype',
		required: 'Por favor, ingrese el tipo de mascota'
	},
	description: {
		type: String,
		default: ''
	},
	isMissing: {
		type: Boolean,
    default: false
	},
	picture: {
		type: String,
		default: '',
		required: 'Por favor, ingrese la foto de su mascota'
	},
	color: {
		type: String,
		default: '',
		required: 'Por favor, ingrese un color'
	},
	email: {
		type: String,
		default: '',
		required: 'Por favor, ingrese un email'
	},
	address: {
		type: String,
		default: '',
		required: 'Por favor, ingrese la dirección'
	},
	tel1: {
		type: String
	},
	tel2: {
		type: String
	},
	genre: {
		type: Schema.ObjectId,
		ref: 'Petgenre'
	},
	breed: {
		type: Schema.ObjectId,
		ref: 'Petbreed'
	},
	yearOfBirth: {
		type: Date,
		default: Date.now
	},
	neutered: {
		type: Boolean,
    default: false
	},
	profileViews: {
		type: Number
	},
	isPrivate: {
		type: Boolean,
    default: true
	},
	isAdoption: {
		type: Boolean,
    default: false
	},
	isFindingDate: {
		type: Boolean,
    default: false
	},
	registered: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: 'Please fill slug name'
	},
	coords: {
		type: Schema.Types.Mixed
	}
});

PetSchema.plugin(new URLSlugs('name', {field: 'slug'}));

mongoose.model('Pet', PetSchema);

