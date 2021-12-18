const { validationResult } = require('express-validator');
const path = require('path');
const db = require('../database/models');

const { modelPelicula, modelGenero } = require(path.resolve(__dirname, '../model'));

console.log(modelPelicula);

const controller = {
	list: function (req, res) {
		modelPelicula
			.getAll()
			.then((movies) => {
				res.render('moviesList', { movies });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	detail: function (req, res) {
		modelPelicula
			.getByPk(req.params.id, {
				include: [{ association: 'actores' }, { association: 'genero' }],
			})
			.then((movie) => {
				res.render('moviesDetail', { movie: movie });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	new: function (req, res) {
		modelPelicula
			.getSome({
				order: [['release_date', 'DESC']],
			})
			.then((movies) => {
				res.render('newestMovies', { movies });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	recomended: function (req, res) {
		modelPelicula
			.getSome({
				order: [['rating', 'DESC']],
				limit: 5,
			})
			.then((movies) => {
				res.render('recommendedMovies', { movies });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	add: function (req, res) {
		modelGenero
			.getAll()
			.then((genres) => {
				res.render('moviesCreate', { genres });
			})
			.catch((err) => {
				console.log(err);
			});
	},

	create: function (req, res) {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			modelGenero
				.getOne({
					where: { name: req.body.genre },
				})
				.then((genre) => {
					modelPelicula.createOne({
						...req.body,
						genre_id: genre.dataValues.id,
					});
				})
				.then(() => res.redirect('/movies'))
				.catch((err) => {
					console.log(err);
				});
		} else {
			modelGenero
				.getAll()
				.then((genres) => {
					res.render('moviesCreate', { genres, errors: errors.mapped(), old: req.body });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	},
	edit: function (req, res) {
		let movie;
		modelPelicula
			.getByPk(req.params.id, {
				include: [{ association: 'genero' }],
			})
			.then((pelicula) => {
				movie = pelicula;
				let dia =
					movie.dataValues.release_date.getDate() < 10
						? '0' + (movie.dataValues.release_date.getDate() + 1)
						: movie.dataValues.release_date.getDate() + 1;
				let mes =
					movie.dataValues.release_date.getMonth() < 10
						? '0' + (movie.dataValues.release_date.getMonth() + 1)
						: movie.dataValues.release_date.getMonth() + 1;
				let date = movie.dataValues.release_date.getFullYear() + '-' + mes + '-' + dia;
				movie.dataValues.release_date = date;
				return modelGenero.getAll();
			})
			.then((genres) => {
				res.render('moviesEdit', { genres: genres, movie: movie.dataValues });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	update: function (req, res) {
		let movie = {
			id: req.params.id,
			...req.body,
		};
		modelPelicula
			.updateOne(movie, { where: { id: req.params.id } })
			.then(() => res.redirect('/movies'))
			.catch((err) => {
				console.log(err);
			});
	},
	destroy: function (req, res) {
		modelPelicula
			.getByPk(req.params.id)
			.then((movie) => {
				res.render('moviesDelete', { movie: movie });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	delete: function (req, res) {
		modelPelicula
			.deleteOne({
				where: { id: req.params.id },
			})
			.then(() => res.redirect('/movies'))
			.catch((err) => {
				console.log(err);
			});
	},
};

module.exports = controller;
