const sequelize = require('../src/Infrastructures/database/postgres/pool');

const RoleTableTestHelper = {
  async cleanTable() {
    await sequelize.Role.truncate();
  },

  async addRole({ name }) {
    try {
      const result = await sequelize.Role.create({ name });
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = RoleTableTestHelper;
