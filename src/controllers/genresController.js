const path = require('path');
const { modelGenero } = require(path.resolve(__dirname, '../model'));

const controller = {
	list: function (req, res) {
		modelGenero
			.getAll()
			.then((genres) => {
				res.render('genresList', { genres });
			})
			.catch((err) => {
				console.log(err);
			});
	},
	detail: function (req, res) {
		modelGenero
			.getByPk(req.params.id, {
				include: [{ association: 'peliculas' }],
			})
			.then((genre) => res.render('genresDetail', { genre }))
			.catch((err) => {
				console.log(err);
			});
	},
};

module.exports = controller;
