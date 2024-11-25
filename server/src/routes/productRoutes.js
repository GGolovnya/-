// routes/productRoutes.js
const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts); // используем функцию из импортированного объекта
router.post('/products', productController.postProduct); // добавление продукта
router.delete('/products/:id', productController.deleteProduct); // удаление продукта

module.exports = router;
