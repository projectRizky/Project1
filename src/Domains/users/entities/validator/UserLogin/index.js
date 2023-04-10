const InvariantError = require('../../../../../Commons/exceptions/InvariantError');
const { UserLoginSchema } = require('./UserLoginSchema');

const UserLoginValidator = {
  validate: (payload) => {
    const validationResult = UserLoginSchema.validate(payload, { abortEarly: false });
    if (validationResult.error) {
      const { details } = validationResult.error;

      throw new InvariantError('USER_LOGIN.BAD_REQUEST', details);
    }
  },
};

module.exports = UserLoginValidator;
