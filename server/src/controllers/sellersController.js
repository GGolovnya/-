// controllers/productController.js
const db = require('../../db/models');
// импортируем весь объект db
const { Seller } = db; // деструктурируем нужную модель

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    res.json(sellers);
  } catch (error) {
    console.error('Database error:', error); // Добавить логирование
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { getAllSellers }; // экспортируем функцию
