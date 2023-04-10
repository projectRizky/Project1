const Joi = require('joi');

const UserLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { UserLoginSchema };
