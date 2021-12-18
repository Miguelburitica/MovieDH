const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));

const model = {
	getAll: function () {
		return db.Genero.findAll()
			.then((genres) => genres)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	getSome: function (condition) {
		return db.Genero.findAll(condition)
			.then((genres) => genres)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	getByPk: function (pk, association) {
		return db.Genero.findByPk(pk, association)
			.then((genre) => genre)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	getOne: function (condition, association) {
		return db.Genero.findOne(condition, association)
			.then((genre) => genre)
			.catch((err) => {
				throw new Error('Sin conexión');
			});
	},
	createOne: function (genre) {
		return db.Genero.create(genre).catch((err) => {
			throw new Error('Sin conexión');
		});
	},
	updateOne: function (genre, condition) {
		if (condition !== undefined && condition !== null) {
			return db.Genero.update(genre, condition).catch((err) => {
				console.log(err);
			});
		} else {
			let err = new Error('Falta un where en el update prro >:s');
			console.log(err);
		}
	},
	deleteOne: function (pk) {
		if (pk !== undefined && pk !== null) {
			return db.Genero.destroy(pk).catch((err) => {
				console.log(err);
			});
		} else {
			let err = new Error('Falta un where en el delete prro >:s');
			console.log(err);
		}
	},
};

module.exports = model;
