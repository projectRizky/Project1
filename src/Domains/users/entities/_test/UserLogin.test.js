const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      email: 'aswad@gmail.com',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.BAD_REQUEST');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      email: 'aswad@gmail.com',
      password: 12345,
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.BAD_REQUEST');
  });

  it('should create UserLogin entities correctly', () => {
    // Arrange
    const payload = {
      email: 'aswad@gmail.com',
      password: '12345',
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.email).toEqual(payload.email);
    expect(userLogin.password).toEqual(payload.password);
  });
});
