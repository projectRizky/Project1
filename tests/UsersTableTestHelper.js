/* eslint-disable new-cap */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const sequelize = require('../src/Infrastructures/database/postgres/pool');
const BcryptPasswordHash = require('../src/Infrastructures/security/BcryptPasswordHash');
const User = require('../src/Infrastructures/sequelize/models/User');

const UsersTableTestHelper = {
  async cleanTable() {
    await sequelize.User.truncate();
  },

  async addUser({
    email, password,
  }) {
    const passwordHelper = new BcryptPasswordHash(bcrypt);
    const passwordHash = await passwordHelper.hash(password);
    await sequelize.User.create({ email, password: passwordHash });
  },
};

module.exports = UsersTableTestHelper;
