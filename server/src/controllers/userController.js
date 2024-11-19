const { User } = require('../../db/models');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'name', 'email']
    });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении профиля', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    await user.update({ name, email });
    res.json({ message: 'Профиль успешно обновлен', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении профиля', error: error.message });
  }
};