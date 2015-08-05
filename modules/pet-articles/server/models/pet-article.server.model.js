'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pet article Schema
 */
var PetArticleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pet article name',
		trim: true
	},
	content: {
		type: String,
		default: '',
		required: 'Please fill article content'
	},
	pet: {
		type: Schema.ObjectId,
		ref: 'Pet'
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

mongoose.model('PetArticle', PetArticleSchema);
