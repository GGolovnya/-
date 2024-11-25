const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
    }
  }
  Seller.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};
