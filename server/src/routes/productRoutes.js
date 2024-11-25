// routes/productRoutes.js
const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts); // используем функцию из импортированного объекта
router.post('/products', productController.postProduct); // добавление продукта

module.exports = router;
