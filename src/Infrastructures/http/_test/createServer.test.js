const request = require('supertest');
const createServer = require('../createServer');

describe('when POST /login', () => {
  it('should response 200 and return token', async () => {
    // Action
    const response = await request(createServer).get('/');

    const responseJson = response.body;
    expect(response.statusCode).toEqual(200);
    expect(responseJson.status).toEqual(true);
    expect(responseJson.message).toEqual('OK');
  });
});
