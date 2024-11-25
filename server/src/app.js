// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const productSellers = require('./routes/productSellers');

const app = express();

// Добавляем middleware CORS
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', productRoutes, productSellers);

module.exports = app;
