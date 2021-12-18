const express = require('express');
const router = express.Router();
const moviesRoutes = require('./movies.Routes')
const genresRoutes = require('./genres.Routes') 
const webRoutes = require('./web.Routes')


/* GET home page. */
router.use('/', webRoutes);

// routes tree for movies
router.use('/movies', moviesRoutes);

// routes tree for genres
router.use('/genres', genresRoutes);

module.exports = router;
