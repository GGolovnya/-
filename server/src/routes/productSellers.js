// routes/productRoutes.js
const express = require('express');

const router = express.Router();
const sellersController = require('../controllers/sellersController');

router.get('/sellers', sellersController.getAllSellers); // используем функцию из импортированного объекта

module.exports = router;
