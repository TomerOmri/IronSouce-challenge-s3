const JwtStrategy = require('passport-jwt'),
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const mockUserDB = {
  12345: {
    name: 'tomer',
    id: 12345,
  },
};

class Auth {

  initialize() {
    passport.use('jwt', this.getStrategy());

    return passport.initialize();
  }

  authenticate(callback) {
    return passport.authenticate('jwt', { session: false, failWithError: true }, callback);
  }

  getStrategy() {
    const params = {
      secretOrKey: process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm15839',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    return new JwtStrategy.Strategy(params, async (payload, done) => {
      try {
        const user = await this.getUser(payload.userId);

        if (user === null)
          return done(null, false, { message: 'The user in the token was not found' });

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    });
  }

  async getUser (userId){
    return mockUserDB[userId];
  }

}

module.exports = Auth;
