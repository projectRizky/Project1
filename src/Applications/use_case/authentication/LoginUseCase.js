const NewAuth = require('../../../Domains/authentication/entities/NewAuth');
const UserLogin = require('../../../Domains/users/entities/UserLogin');

class LoginUseCase {
  constructor({
    userRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { email, password } = new UserLogin(useCasePayload);
    const encryptedPassword = await this._userRepository.getPasswordByEmail(email);
    await this._passwordHash.comparePassword(password, encryptedPassword);
    const id = await this._userRepository.getIdByUsername(email);

    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ email, id });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ email, id });

    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });

    return newAuthentication;
  }
}

module.exports = LoginUseCase;
