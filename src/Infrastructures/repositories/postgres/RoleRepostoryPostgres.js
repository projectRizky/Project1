const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const RoleRepository = require('../../../Domains/roles/RoleRepository');

class RoleRepositoryPostgres extends RoleRepository {
  constructor(pool) {
    super();

    this._pool = pool;
  }

  async verifyAvailableRole(roleId) {
    const { Role } = this._pool;

    const result = await Role.findByPk(roleId);
    if (!result) {
      throw new NotFoundError('role tidak ditemukan');
    }
  }
}

module.exports = RoleRepositoryPostgres;
