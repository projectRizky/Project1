/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'super admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'developer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
