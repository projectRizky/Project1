const request = require('supertest');
const RoleTableTestHelper = require('../../../../tests/RoleTabletesthelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const createServer = require('../createServer');

describe('/register endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /register', () => {
    it('should response 400 when email not available', async () => {
      // Arrange
      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
        role_id: '123',
        phone: '0813334',
      };

      // Add User
      await UsersTableTestHelper.addUser({ email: 'aswad@gmail.com', password: 'password' });
      // Action
      const response = await request(createServer).post('/register').send(requestPayload);

      const responseJson = response.body;
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual(false);
      expect(responseJson.message).toEqual('user tidak tersedia');
    });

    it('should response 400 when payload not meet spesifications', async () => {
      // Arrange
      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
        phone: '0813334',
      };

      // Action
      const response = await request(createServer).post('/register').send(requestPayload);

      const responseJson = response.body;
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual(false);
      expect(responseJson.message).toEqual('bad request');
    });

    it('should response 201 and return token', async () => {
      // Arrange

      const role = await RoleTableTestHelper.addRole({ name: 'test' });

      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
        phone: '0813334',
        role_id: role.id,
      };

      // Action
      const response = await request(createServer).post('/register').send(requestPayload);
      // Assert
      const responseJson = response.body;
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual(true);
      expect(responseJson.message).toEqual('registrasi berhasil');
      expect(responseJson.data.accessToken).not.toBeNull();
      expect(responseJson.data.refreshToken).not.toBeNull();
    });
  });
});
