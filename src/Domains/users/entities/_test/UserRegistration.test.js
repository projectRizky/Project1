const RoleTableTestHelper = require('../../../../../tests/RoleTabletesthelper');
const UserRegistration = require('../UserRegistration');

describe('UserRegister Entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      email: 'aswad@gmail.com',
    };

    // Action & Assert
    expect(() => new UserRegistration(payload)).toThrowError('USER_REGISTRATION.BAD_REQUEST');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      role_id: 12345,
      email: 'aswad@gmail.com',
      password: true,
      phone: 12345,
    };

    // Action & Assert
    expect(() => new UserRegistration(payload)).toThrowError('USER_REGISTRATION.BAD_REQUEST');
  });

  it('should create UserLogin entities correctly', async () => {
    // Arrange

    const role = await RoleTableTestHelper.addRole({ name: 'test' });

    const payload = {
      role_id: role.id,
      email: 'aswad@gmail.com',
      password: '12345',
      phone: '0813591xxx',
    };

    // Action
    const userRegistration = new UserRegistration(payload);
    // Assert
    expect(userRegistration).toBeInstanceOf(UserRegistration);
    expect(userRegistration.email).toEqual(payload.email);
    expect(userRegistration.password).toEqual(payload.password);
  });
});
