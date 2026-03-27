const express = require('express');
const router = express.Router();
const crudController = require('../controller/crud');

// IMPORTANTE: Aquí defines la ruta
router.get('/subfusiles', crudController.getSubfusiles);
module.exports = router; // <--- Si no exportas esto, el index.js no ve nada