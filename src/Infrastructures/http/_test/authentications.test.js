const request = require('supertest');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const createServer = require('../createServer');

describe('/login endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /login', () => {
    it('should response 200 and return token', async () => {
      // Arrange
      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
      };

      // Add User
      await UsersTableTestHelper.addUser({ email: 'aswad@gmail.com', password: 'password' });
      // Action
      const response = await request(createServer).post('/login').send(requestPayload);

      // Assert
      const responseJson = response.body;
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual(true);
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it('should response 401 when credential wrong', async () => {
      // Arrange
      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
      };

      // Add User
      await UsersTableTestHelper.addUser({ email: 'aswad@gmail.com', password: 'xxx' });
      // Action
      const response = await request(createServer).post('/login').send(requestPayload);
      // Assert
      const responseJson = response.body;
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual(false);
    });

    it('should response 404 when user not found', async () => {
      // Arrange
      const requestPayload = {
        email: 'aswad@gmail.com',
        password: 'password',
      };

      // Add User
      await UsersTableTestHelper.addUser({ email: 'xxx', password: 'xxx' });
      // Action
      const response = await request(createServer).post('/login').send(requestPayload);

      // Assert
      const responseJson = response.body;
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual(false);
    });
  });
});
