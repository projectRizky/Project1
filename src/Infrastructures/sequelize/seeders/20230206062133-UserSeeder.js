const crypto = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: crypto.randomUUID(),
        email: 'aswad@gmail.com',
        password: '$2b$10$VOO18plh9YyPrjwb3dckquz/5/3w0d0EKxEwDRlVPZQ63ttatQMJS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: crypto.randomUUID(),
        email: 'admin@gmail.com',
        password: '$2b$10$VOO18plh9YyPrjwb3dckquz/5/3w0d0EKxEwDRlVPZQ63ttatQMJS',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
