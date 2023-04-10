const RoleTableTestHelper = require('../../../../../tests/RoleTabletesthelper');
const UsersTableTestHelper = require('../../../../../tests/UsersTableTestHelper');
const UserRegistration = require('../../../../Domains/users/entities/UserRegistration');
const db = require('../../../database/postgres/pool');
const sequelize = require('../../../database/postgres/pool');
// const pool = require('./database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('AuthenticationRepository postgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('getPasswordByEmail', () => {
    it('should return throw NotFoundError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(db);

      // Action & Assert
      await expect(userRepositoryPostgres.getPasswordByEmail('xxx'))
        .rejects
        .toThrowError();
    });

    it('should return PasswordHash when email found', async () => {
      // Arrange
      // Add User
      await UsersTableTestHelper.addUser({ email: 'aswad@gmail.com', password: 'password' });

      const userRepositoryPostgres = new UserRepositoryPostgres(db);

      // Action
      const passwordHash = await userRepositoryPostgres.getPasswordByEmail('aswad@gmail.com');

      // Assert
      expect(passwordHash).not.toBeNull();
    });
  });

  describe('getIdByUsername', () => {
    it('should return NotFoundError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(db);

      // Action & Assert
      await expect(userRepositoryPostgres.getIdByUsername('xxx'))
        .rejects
        .toThrowError();
    });

    it('should return user id correctly', async () => {
      // Arrange
      // Add User
      await UsersTableTestHelper.addUser({ email: 'aswad@gmail.com', password: 'password' });

      const userRepositoryPostgres = new UserRepositoryPostgres(db);

      // Action & Assert
      const userEmail = await userRepositoryPostgres.getPasswordByEmail('aswad@gmail.com');

      expect(userEmail).not.toBeNull();
    });
  });

  describe('addUser', () => {
    it('should return new user correctly', async () => {
      // Arrange

      const role = await RoleTableTestHelper.addRole({ name: 'test' });

      const payload = new UserRegistration({
        role_id: role.id,
        email: 'hajaraswadkom1@gmail.com',
        phone: '0823764',
        password: 'secret',
      });

      const userRepositoryPostgres = new UserRepositoryPostgres(db);

      // Action
      const addUser = await userRepositoryPostgres.addUser(payload);
      // Assert
      expect(addUser.email).toEqual('hajaraswadkom1@gmail.com');
      expect(addUser.phone).toEqual('0823764');
      expect(addUser.password).toEqual('secret');
    });
  });
});
