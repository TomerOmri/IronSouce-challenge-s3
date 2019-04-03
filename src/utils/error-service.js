function errorFactory (message, statusCode) {
  let error = new Error(message);
  error.statusCode = statusCode;

  return error;
}

module.exports = {
  BadRequest: message => {
    return errorFactory(message, 400);
  },
  NotAuthorized: message => {
    return errorFactory(message, 401);
  },
  NotFound: message => {
    return errorFactory(message, 404);
  },
  GeneralError: message => {
    return errorFactory(message, 500);
  },
};
