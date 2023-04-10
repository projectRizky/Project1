const UserLoginValidator = require('./validator/UserLogin/index');

class UserLogin {
  constructor(payload) {
    // validate payload
    UserLoginValidator.validate(payload);

    this.email = payload.email;
    this.password = payload.password;
  }

  // _verifyPayload(payload) {
  //   const { email, password } = payload;

  //   if (!email || !password) {
  //     throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  //   }

  //   if (typeof email !== 'string' || typeof password !== 'string') {
  //     throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  //   }
  // }
}

module.exports = UserLogin;
