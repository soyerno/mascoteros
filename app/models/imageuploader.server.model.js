'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Imageuploader Schema
 */
var ImageuploaderSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Imageuploader name',
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

mongoose.model('Imageuploader', ImageuploaderSchema);