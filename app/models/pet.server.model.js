'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	type: {
		type: Schema.ObjectId,
		ref: 'Pettype'
	},
	description: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		default: '',
		required: 'Please fill Slug name',
		trim: true
	},
	picture: {
		type: String,
		default: '',
		required: 'Please fill Pet picture',
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Pet color',
	},
	genre: {
		type: Schema.ObjectId,
		ref: 'Petgenre'
	},
	breed: {
		type: String,
		default: '',
		required: 'Please fill Pet breed',
		trim: true
	},
	yearOfBirth: {
		type: Date,
		default: Date.now
	},
	neutered: {
		type: Boolean
	}
});

mongoose.model('Pet', PetSchema);
