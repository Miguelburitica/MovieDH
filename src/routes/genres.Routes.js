const express = require('express');
const router = express.Router();
const { genresController } = require('../controllers');

router.get('/', genresController.list);

router.get('/detail/:id', genresController.detail);


module.exports = router;