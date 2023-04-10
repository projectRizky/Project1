const UserRegistrationValidator = require('./validator/UserRegistration');

class UserRegistration {
  constructor(payload) {
    // validate payload
    UserRegistrationValidator.validate(payload);

    this.roleId = payload.role_id;
    this.email = payload.email;
    this.phone = payload?.phone;
    this.password = payload.password;
  }
}

module.exports = UserRegistration;
