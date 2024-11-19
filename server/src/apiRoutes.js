const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

// Аутентификация
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh-token', authController.refreshToken);

// Пользователь
router.get('/user/profile', userController.getProfile);
router.put('/user/profile', userController.updateProfile);

// Добавьте другие маршруты API здесь

module.exports = router;