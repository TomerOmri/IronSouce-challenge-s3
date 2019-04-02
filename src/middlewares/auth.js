const Auth = require('../controllers/auth');
let autho = new Auth();

module.exports = (req, res, next) => {
  const { path } = req;

  if (path.includes('upload') || path.includes('download') || path.includes('heartbeat'))// todo: take from config array
    return next();

  return autho.authenticate((error, user, info) => {
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
