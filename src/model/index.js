const path = require('path');

const modelPelicula = require(path.resolve(__dirname, './modelPelicula'));
const modelGenero = require(path.resolve(__dirname, './modelGenero'));

module.exports = {
	modelPelicula,
	modelGenero,
};
