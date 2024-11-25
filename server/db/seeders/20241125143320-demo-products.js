/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      { title: 'Фрукт 1', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Фрукт 2', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Фрукт 3', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
