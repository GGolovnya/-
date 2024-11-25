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

const postProduct = async (req, res) => {
  try {
    const { title } = req.body;
    const product = await Product.create({
      title,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { getAllProducts, postProduct, deleteProduct };
