'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Issue Schema
 */
var IssueSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Issue name',
		trim: true
	},
	image: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Issue description',
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

mongoose.model('Issue', IssueSchema);
