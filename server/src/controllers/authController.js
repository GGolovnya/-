const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
    }
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    await user.update({ refreshToken });
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      userId: user.id,
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
};

exports.login = async (req, res) => {
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
};

exports.refreshToken = async (req, res) => {
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
};