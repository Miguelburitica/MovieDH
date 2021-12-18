const path = require('path')

const moviesController = require('./moviesController');
const genresController = require('./genresController');
const webController = require('./webController')

module.exports = {
    moviesController: moviesController,
    genresController: genresController,
    webController: webController
}