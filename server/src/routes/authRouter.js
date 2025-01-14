const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { User } = require('../../db/models');

// Middleware для валидации
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
      return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET не определен в переменных окружения');
      return res.status(500).json({ message: 'Ошибка конфигурации сервера' });
    }
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    console.log(`Как АААААА: ${refreshToken}`);
    await user.update({ refreshToken });
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован', userId: user.id, token, refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    await user.update({ refreshToken });

    res.json({
      message: 'Вход выполнен успешно',
      userId: user.id,
      name: user.name,
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе', error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token не предоставлен' });
  }

  try {
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) {
      return res.status(403).json({ message: 'Недействительный Refresh Token' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Недействительный Refresh Token' });
      }

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера при обновлении токена' });
  }
});

module.exports = router;
