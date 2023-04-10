const RoleRepository = require('../../../../Domains/roles/RoleRepository');
const UserRepository = require('../../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../../security/AuthenticationTokenManager');
const PasswordHash = require('../../../security/PasswordHash');
const RegisterUseCase = require('../RegisterUseCase');

describe('Register Use Case', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const payloadUseCase = {
      email: 'aswad@gmail.com',
      phone: '081343434',
      role_id: 1,
      password: 'secret',
    };

    const expectedAddUser = {
      id: 1,
      email: 'aswad@gmail.com',
      phone: '081343434',
    };

    const expectedRegistration = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };

    const mockUserRepository = new UserRepository();
    const mockAuthenticationManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();
    const mockRoleRepository = new RoleRepository();

    mockUserRepository.verifyAvailableEmail = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockRoleRepository.verifyAvailableRole = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddUser));
    mockAuthenticationManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('access_token'));
    mockAuthenticationManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('refresh_token'));
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    const registerUseCase = new RegisterUseCase({
      userRepository: mockUserRepository,
      authenticationTokenManager: mockAuthenticationManager,
      passwordHash: mockPasswordHash,
      roleRepository: mockRoleRepository,
    });

    // Action
    const actualRegistrationUser = await registerUseCase.execute(payloadUseCase);

    // Assert
    expect(actualRegistrationUser).toEqual(expectedRegistration);

    expect(mockUserRepository.verifyAvailableEmail)
      .toBeCalledWith('aswad@gmail.com');
    expect(mockRoleRepository.verifyAvailableRole)
      .toBeCalledWith(1);
    expect(mockPasswordHash.hash)
      .toBeCalledWith('secret');
    expect(mockUserRepository.addUser)
      .toBeCalledWith({
        roleId: 1, email: 'aswad@gmail.com', password: 'encrypted_password', phone: '081343434',
      });
    expect(mockAuthenticationManager.createAccessToken)
      .toBeCalledWith({ email: 'aswad@gmail.com', id: 1 });
    expect(mockAuthenticationManager.createRefreshToken)
      .toBeCalledWith({ email: 'aswad@gmail.com', id: 1 });
  });
});
