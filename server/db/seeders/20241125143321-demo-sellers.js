/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sellers', [
      {
        title: 'Продавец', name: 'Сергей', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: 'Грузчик', name: 'Андрей', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: 'Бухгалтер', name: 'Георгий', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sellers', null, {});
  },
};
