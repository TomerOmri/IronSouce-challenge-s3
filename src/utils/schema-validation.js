const Joi = require('joi');

const fileSchema = Joi.object().keys({
  ownerId: Joi.string().required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  access_token: Joi.string(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

module.exports = fileSchema;
