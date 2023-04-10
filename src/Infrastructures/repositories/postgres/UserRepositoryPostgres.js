const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const UserRepository = require('../../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool) {
    super();

    this._pool = pool;
  }

  async addUser(registerUser) {
    const { User } = this._pool;
    const {
      roleId, email, phone, password,
    } = registerUser;

    try {
      const result = await User.create({ email, phone, password });

      await result.addRole(roleId);

      return result;
    } catch (error) {
      return error.message;
      // throw new Error(error);
    }
  }

  async getPasswordByEmail(email) {
    const { User } = this._pool;
    const result = await User.findOne({ where: { email }, attributes: ['password'] });

    if (!result) {
      throw new NotFoundError('user id tidak di temukan');
    }

    return result.password;
  }

  async getIdByUsername(email) {
    const { User } = this._pool;
    const result = await User.findOne({ where: { email }, attributes: ['id'] });

    if (!result) {
      throw new NotFoundError('user id tidak di temukan');
    }

    return result.id;
  }

  async verifyAvailableEmail(email) {
    const { User } = this._pool;
    const result = await User.findOne({ where: { email }, attributes: ['id'] });

    if (result) {
      throw new InvariantError('user tidak tersedia');
    }
  }

  //   async getPasswordByUsername() {

  //   }
}

module.exports = UserRepositoryPostgres;
