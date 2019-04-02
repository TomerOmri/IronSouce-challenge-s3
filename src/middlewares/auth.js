const Auth = require('../controllers/auth');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const { path } = req;

  if (config.publicRoutes.includes(path))
    return next();

  return Auth.authenticate((error, user, info) => {
    if (error)
      return next(error);

    if (!user) {
      if (info.name === 'TokenExpiredError')
        return res.status(401).json({ message: 'Your token has expired. Please generate a new one' });

      return res.status(401).json({ message: info.message });
    }

    req.userData = user;

    return next();
  })(req, res, next);
};
