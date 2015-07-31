'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Petbreed = mongoose.model('Petbreed'),
	Pettype = mongoose.model('Pettype'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Petbreed
 */
exports.create = function(req, res) {
	var petbreed = new Petbreed(req.body);
	petbreed.user = req.user;

	petbreed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

exports.caninosFromArrays = function(req, res) {

	Pettype.find({'name': 'Caninos'}).exec(function(err, caninosObj) {

		var caninos = ["Mestizo", "Afghan Hound", "Airedale Terrier", "Akita Inu", "Alaskan Malamute", "American Staffordshire Terrier", "Barzoi", "Basenji", "Basset Hound", "Beagle", "Bichon Frise", "Bloodhound", "Border Collie", "Boyero de Berna", "Boyero de Flandes", "Braco Aleman", "Braco Italiano", "Bull Terrier", "Bulldog Frances", "Bulldog Ingles", "Bullmastiff", "Boxer", "Caniche", "Chihuahua", "Chow Chow", "Chow Chow", "Cocker Spaniel", "Cocker Spaniel Ingles", "Collie", "Dachshund", "Doberman Pinscher", "Dobermann", "Dogo argentino", "Dogo de Burdeos", "Dalmata", "Fila Brasileiro", "Fox Terrier", "Fox Terrier Chileno", "Fox Terrier de pelo duro", "Galgo", "Golden Retriever", "Gran Danes", "Gran Pirineo", "Greyhound", "Komondor", "Kuvasz", "Labrador Retriever", "Lhasa Apso", "Maltes", "Mastin", "Mestizo", "Norfolk Terrier", "Norwich Terrier", "Otro", "Papillon", "Pastor Blanco Suizo", "Pastor Ingles", "Pastor aleman", "Pastor belga", "Pekines", "Perdiguero", "Perro de Agua Espa&ntilde;ol", "Pinscher miniatura", "Pit Bull", "Pointer", "Pomerania", "Poodle", "Presa Canario", "Pug", "Puli", "Rhodesian Ridgeback", "Rottweiler", "Samoyedo", "San Bernardo", "Schnauzer Estandar", "Schnauzer Gigante", "Schnauzer Miniatura", "Scottish Terrier", "Setter Ingles", "Setter Irlandes", "Shar Pei", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Teckel", "Terranova", "Weimaraner", "West Highland Terrier", "Whippet", "Yorkshire Terrier"];
		var pushed = [];

		caninos.forEach(function(e, i){

			var petbreed = new Petbreed();
			petbreed.name = e;
			petbreed.pettype = caninosObj[0]._id;
			petbreed.user = req.user;

			petbreed.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log(petbreed);
					pushed.push(petbreed);
					if(i === caninos.length - 1){
						res.jsonp(pushed);
					}
				}
			});
		});


	});

};

exports.felinosFromArrays = function(req, res) {

	Pettype.find({'name': 'Felinos'}).exec(function(err, felinosObj) {

		var felinos = ["Mestizo", "Abisinio", "Angora (Turco)", "Asiatico Humo - Atigrado", "Azul Ruso", "Balines", "Bengal", "Bobtail Japones", "Bombay", "Bosque de Noruega", "Brasile&ntilde;o de Pelo Corto", "British shorthair", "Britanico", "Burmes", "Cartujo (Chartreux)", "Cornish Rex", "Curl Americano", "Cymric", "Domestico Comun o Mestizo", "Esfinge", "Exotico", "Habana", "Himalayo", "Korat", "Maine Coon", "Manx", "Mau Egipcio", "Mestizo", "Ocicat", "Oriental", "Pelicorto Americano", "Pelicorto Europeo", "Persa", "Ragdoll", "Rex", "Romano Naranjo", "Sagrado de Birmania", "Siames", "Siberiano", "Singapur", "Somali", "Sphinx"];
		var pushed = [];

		felinos.forEach(function(e, i){

			var petbreed = new Petbreed();
			petbreed.name = e;
			petbreed.pettype = felinosObj[0]._id;
			petbreed.user = req.user;

			petbreed.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log(petbreed);
					pushed.push(petbreed);
					if(i === felinos.length - 1){
						res.jsonp(pushed);
					}
				}
			});
		});


	});

};

/**
 * Show the current Petbreed
 */
exports.read = function(req, res) {
	res.jsonp(req.petbreed);
};

/**
 * Update a Petbreed
 */
exports.update = function(req, res) {
	var petbreed = req.petbreed ;

	petbreed = _.extend(petbreed , req.body);

	petbreed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

/**
 * Delete an Petbreed
 */
exports.delete = function(req, res) {
	var petbreed = req.petbreed ;

	petbreed.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreed);
		}
	});
};

/**
 * List of Petbreeds
 */
exports.list = function(req, res) {
	console.log(req);
	Petbreed.find({'pettype': req.query.typeId }).sort('-created').populate('user', 'displayName').populate('pettype', 'name').exec(function(err, petbreeds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petbreeds);
		}
	});
};

/**
 * Petbreed middleware
 */
exports.petbreedByID = function(req, res, next, id) { Petbreed.findById(id).populate('user', 'displayName').populate('pettype', 'name').exec(function(err, petbreed) {
		if (err) return next(err);
		if (! petbreed) return next(new Error('Failed to load Petbreed ' + id));
		req.petbreed = petbreed ;
		next();
	});
};

