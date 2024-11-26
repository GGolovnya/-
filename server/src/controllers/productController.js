// controllers/productController.js
const db = require('../../db/models');

const { Product } = db;

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const postProduct = async (req, res) => {
  try {
    const { title, price, weight } = req.body;
    const product = await Product.create({
      title,
      price,
      weight,
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
      where: { id },
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

//
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      title: req.body.title || 'Название не указано',
      price: req.body.price || 0.00,
      weight: req.body.weight || 0.00,
    };

    const [updated] = await Product.update(
      updates,
      { where: { id } },
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct);
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

const updatePatchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await Product.update(
      updates,
      { where: { id } },
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Продукт не найден' });
    }
  } catch (error) {
    console.error('Ошибка базы данных:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts, postProduct, deleteProduct, updateProduct, updatePatchProduct,
};
