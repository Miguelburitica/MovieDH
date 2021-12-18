const db = require('../database/models/index');
const { validationResult } = require('express-validator');

const controller = {
	list: function (req, res) {
		db.Peliculas.findAll()
			.then((movies) => {
				res.render('moviesList', { movies });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	detail: function (req, res) {
		db.Peliculas.findByPk(req.params.id, {
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
		db.Peliculas.findAll({
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
		db.Peliculas.findAll({
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
		db.Generos.findAll()
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
			db.Generos.findOne({
				where: { name: req.body.genre },
			})
				.then((genre) => {
					db.Peliculas.create({
						...req.body,
						genre_id: genre.dataValues.id,
					});
				})
				.then(() => res.redirect('/movies'))
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log(errors.mapped());
			db.Generos.findAll()
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
		db.Peliculas.findByPk(req.params.id, {
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
				return db.Generos.findAll();
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
		db.Peliculas.update(movie, { where: { id: req.params.id } })
			.then(() => res.redirect('/movies'))
			.catch((err) => {
				console.log(err);
			});
	},
	destroy: function (req, res) {
		db.Peliculas.findByPk(req.params.id)
			.then((movie) => {
				res.render('moviesDelete', { movie: movie });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	delete: function (req, res) {
		db.Peliculas.destroy({
			where: { id: req.params.id },
		})
			.then(() => res.redirect('/movies'))
			.catch((err) => {
				console.log(err);
			});
	},
};

module.exports = controller;
