const Joi = require('joi');
const errorService = require('../utils/error-service');

module.exports = (schema, options = { allowUnknown: false, convert: true }, type = 'query') => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.userData, schema, options);

    if (error)
      return next(errorService.BadRequest('Validation failed'));

    return next();
  };
};
