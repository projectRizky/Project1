const NewAuth = require('../../../../Domains/authentication/entities/NewAuth');
const UserRepository = require('../../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../../security/AuthenticationTokenManager');
const PasswordHash = require('../../../security/PasswordHash');
const LoginUseCase = require('../LoginUseCase');

describe('Login Use Case', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // arrange
    const useCasePayload = {
      email: 'aswad@gmail.com',
      password: 'secret',
    };

    const expectedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockUserRepository = new UserRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByEmail = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    // create use case instance
    const loginUserUseCase = new LoginUseCase({
      userRepository: mockUserRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByEmail)
      .toBeCalledWith('aswad@gmail.com');
    expect(mockPasswordHash.comparePassword)
      .toBeCalledWith('secret', 'encrypted_password');
    expect(mockUserRepository.getIdByUsername)
      .toBeCalledWith('aswad@gmail.com');
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ email: 'aswad@gmail.com', id: 'user-123' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ email: 'aswad@gmail.com', id: 'user-123' });
  });
});
