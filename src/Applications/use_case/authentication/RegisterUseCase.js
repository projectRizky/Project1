const NewAuth = require('../../../Domains/authentication/entities/NewAuth');
const UserRegistration = require('../../../Domains/users/entities/UserRegistration');

class RegisterUseCase {
  constructor({
    userRepository,
    authenticationTokenManager,
    passwordHash,
    roleRepository,
  }) {
    this._userRepository = userRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
    this._roleRepository = roleRepository;
  }

  async execute(useCasePayload) {
    const {
      roleId, email, phone, password,
    } = new UserRegistration(useCasePayload);

    await this._userRepository.verifyAvailableEmail(email);
    await this._roleRepository.verifyAvailableRole(roleId);

    const encriptedPassword = await this._passwordHash.hash(password);

    const { id } = await this._userRepository.addUser({
      roleId, email, phone, password: encriptedPassword,
    });

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

module.exports = RegisterUseCase;
