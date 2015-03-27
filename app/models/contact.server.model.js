'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Contact name',
		trim: true
	},
	tel: {
		type: String,
		default: '',
		required: 'Please fill Contact Tel',
		trim: true
	},
	role: {
		type: String,
		default: '',
		required: 'Please fill Contact role',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Contact email',
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

mongoose.model('Contact', ContactSchema);
