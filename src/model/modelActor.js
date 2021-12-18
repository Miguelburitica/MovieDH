const db = require('../database/models');

const model = {
	getAll: function () {
		db.Actor.getAll()
			.then((actores) => {
				return actores;
			})
			.catch((err) => {
				console.log(err);
			});
	},
};

module.exports = model;
