/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'model_has_roles',
      {
        model_type: {
          type: Sequelize.STRING,
        },
        model_id: {
          type: Sequelize.UUID,
        },
        role_id: {
          type: Sequelize.INTEGER,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('model_has_roles');
  },
};
