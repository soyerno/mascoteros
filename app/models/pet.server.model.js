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
	isMissing: {
		type: Boolean
	},
	picture: {
		type: String,
		default: '',
		required: 'Please fill Pet picture'
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Pet color'
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Pet Email'
	},
	address: {
		type: String,
		default: '',
		required: 'Please fill Pet Address'
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
	},
	profileViews: {
		type: Number
	},
	isPrivate: {
		type: Boolean
	},
	isAdoption: {
		type: Boolean
	},
	registered: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: 'Please fill slug name'
	}
});

PetSchema.plugin(new URLSlugs('name', {field: 'slug'}));

mongoose.model('Pet', PetSchema);

