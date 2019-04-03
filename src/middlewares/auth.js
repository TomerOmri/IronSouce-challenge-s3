const Auth = require('../controllers/auth');
const config = require('../config/config');
const errorService = require('../utils/error-service');

module.exports = (req, res, next) => {
  const { path } = req;

  if (isPublicRoute(path))
    return next();

  return Auth.authenticate((error, user, info) => {
    if (error)
      return next(error);

    if (!user) {
      if (info.name === 'TokenExpiredError')
        return errorService.NotAuthorized('Your token has expired. Please generate a new one');

      return errorService.NotAuthorized(info.message);
    }

    req.userData = user;

    return next();
  })(req, res, next);
};

function isPublicRoute (path) {
  let isPublic = false;
  config.envVariables.publicRoutes.forEach(  publicRoute =>  {
    if (path.includes(publicRoute))
      isPublic = true;
  } );

  return isPublic;
}
