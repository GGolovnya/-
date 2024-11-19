const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { User } = require('../../db/models');

if (!process.env.JWT_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables');
}

const createTokens = (userId) => ({
  token: jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }),
  refreshToken: jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }),
});

const registerValidation = [
  body('name').isLength({ min: 2 }).withMessage('Имя должно содержать минимум 2 символа'),
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
];

router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email уже используется' });
    }
    const user = await User.create({ name, email, password });
    const { token, refreshToken } = createTokens(user.id);
    await user.update({ refreshToken });
    res.status(201).json({
      message: 'Регистрация успешна', userId: user.id, token, refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }
    const { token, refreshToken } = createTokens(user.id);
    await user.update({ refreshToken });
    res.json({
      message: 'Вход выполнен', userId: user.id, name: user.name, token, refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка входа', error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Отсутствует Refresh Token' });
  }
  try {
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) {
      return res.status(403).json({ message: 'Недействительный Refresh Token' });
    }
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Недействительный Refresh Token' });
  }
});

module.exports = router;
