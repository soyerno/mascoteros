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
	slug: {
		type: String,
		default: '',
		required: 'Please fill Pet name',
		trim: true
	},
	picture: {
		type: String,
		default: '',
		required: 'Please fill Pet name',
		trim: true
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Pet name',
		trim: true
	},
	breed: {
		type: String,
		default: '',
		required: 'Please fill Pet name',
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
