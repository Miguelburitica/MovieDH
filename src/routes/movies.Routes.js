const express = require('express');
const router = express.Router();
const { moviesController } = require('../controllers');
const { check } = require('express-validator');
const db = require('../database/models');

let validateMovie = [
	check('title').notEmpty().withMessage('El título de la pelicula no debe estar vacío amig@u O.o .'),
	check('rating')
		.notEmpty()
		.withMessage('No puedes dejar este campo vacío ._.')
		.isFloat({
			min: 0.0,
			max: 10.0,
		})
		.withMessage('el rating debe estar entre 0 y 10, no quieras exagerar, eh! °~° .'),
	check('awards')
		.notEmpty()
		.withMessage('Hey!, debes llenar este campo también :D .')
		.isInt()
		.withMessage('Hey!, aquí debes ingresar la cantidad de premios obtenidos, CANTIDAD. ¬¬'),

	check('release_date')
		.notEmpty()
		.withMessage('Debes poner la fecha de lanzamiento de esta peli, como para tener claro si somos gemel@s :3')
		.isDate()
		.withMessage(
			'Bueno, no sé como pudiste no poner la fecha en el formato de fecha, pero, por favor no lo vuelvas a hacer UwU'
		),
	check('length')
		.notEmpty()
		.withMessage('Creo que tienes que ingresar la duración de la peli, que sea en minutos porfis :3')
		.bail()
		.isInt({ min: 30 })
		.withMessage(
			'Amig@u debes ingresar los minutos como un número, además debe durar más de 30 minutos, por favor.'
		),
	check('genre').notEmpty().withMessage('Debes elegir algún genero para la peli :/'),
	// .bail()
	// .custom((value) => {
	// 	db.Generos.findAll({
	// 		where: { name: value },
	// 	})
	// 		.then((genero) => {
	// 			var genre = genero;
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// 	console.log(genre);
	// 	if (genre == value && genre != null) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// })
	// .withMessage(
	// 	'Bueno, parece que te las ingenieaste en ingresar un valor distinto a los que tenemos guardados, mejor elije uno que ya exista'
	// ),
];

//     List of movies
// A list of all movies
router.get('/', moviesController.list);

// A list from the newest movies
router.get('/new', moviesController.new);

// A list with the top 5
router.get('/recommended', moviesController.recomended);

//    CRUD of movies

//  " C " Create module
// The view for creat a new movie
router.get('/create', moviesController.add);

// the create process
router.post('/create', validateMovie, moviesController.create);

// " R " Read module
// The deatil view of a particular movie
router.get('/detail/:id', moviesController.detail);

// " U " Update module
// the view for edit a movie
router.get('/update/:id', moviesController.edit);

// the edit process
router.put('/update/:id', validateMovie, moviesController.update);

// " D " Delete module
// the view for delete a movie
router.get('/delete/:id', moviesController.destroy);

// the delete process
router.delete('/delete/:id', moviesController.delete);

module.exports = router;
