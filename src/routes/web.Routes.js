const express = require('express');
const router = express.Router();
const { webController } = require('../controllers')

router.get('/', webController.getHome);

module.exports = router;