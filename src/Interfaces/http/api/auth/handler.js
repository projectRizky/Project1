const LoginUseCase = require('../../../../Applications/use_case/authentication/LoginUseCase');
const RegisterUseCase = require('../../../../Applications/use_case/authentication/RegisterUseCase');
const ResponseFormatter = require('../../../../Commons/response/ResponseFormatter');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.postRegistrationHandler = this.postRegistrationHandler.bind(this);
    // this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h, next) {
    try {
      const loginUseCase = await this._container.getInstance(LoginUseCase.name);
      const { accessToken, refreshToken } = await loginUseCase.execute(request.body);

      return h.status(200).send(ResponseFormatter.success(
        'Login Berhasil',
        {
          accessToken,
          refreshToken,
        },
      ));
    } catch (error) {
      return next(error);
    }
  }

  async postRegistrationHandler(request, h, next) {
    try {
      const registerUseCase = await this._container.getInstance(RegisterUseCase.name);
      const { accessToken, refreshToken } = await registerUseCase.execute(request.body);

      return h.status(201).send(ResponseFormatter.success(
        'registrasi berhasil',
        {
          accessToken,
          refreshToken,
        },
      ));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthenticationsHandler;
