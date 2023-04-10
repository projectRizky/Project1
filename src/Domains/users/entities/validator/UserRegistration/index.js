const InvariantError = require('../../../../../Commons/exceptions/InvariantError');
const { UserRegistrationSchema } = require('./UserRegistrationSchema');

const UserRegistrationValidator = {
  validate: (payload) => {
    const validationResult = UserRegistrationSchema.validate(payload, { abortEarly: false });
    if (validationResult.error) {
      const { details } = validationResult.error;

      throw new InvariantError('USER_REGISTRATION.BAD_REQUEST', details);
    }
  },
};

module.exports = UserRegistrationValidator;
