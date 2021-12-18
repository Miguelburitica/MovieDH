const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));

const model = {
	getAll: function () {
		return db.Pelicula.findAll()
			.then((movies) => movies)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	getSome: function (condition) {
		return db.Pelicula.findAll(condition)
			.then((movies) => movies)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	getByPk: function (pk, association) {
		return db.Pelicula.findByPk(pk, association)
			.then((movie) => movie)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	createOne: function (movie) {
		return db.Pelicula.create(movie).catch((err) => {
			throw new Error('Sin conexión');
		});
	},
	updateOne: function (movie, condition) {
		if (condition !== undefined && condition !== null) {
			return db.Pelicula.update(movie, condition).catch((err) => {
				console.log(err);
			});
		} else {
			let err = new Error('Falta un where en el update prro >:s');
			console.log(err);
		}
	},
	deleteOne: function (pk) {
		if (pk !== undefined && pk !== null) {
			return db.Pelicula.destroy(pk).catch((err) => {
				console.log(err);
			});
		} else {
			let err = new Error('Falta un where en el delete prro >:s');
			console.log(err);
		}
	},
};

module.exports = model;
