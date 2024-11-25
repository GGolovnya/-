// controllers/productController.js
const db = require('../../db/models');
// импортируем весь объект db
const { Product } = db; // деструктурируем нужную модель

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Database error:', error); // Добавить логирование
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { getAllProducts }; // экспортируем функцию
