const Joi = require('joi');

const UserRegistrationSchema = Joi.object({
  role_id: Joi.number().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { UserRegistrationSchema };
