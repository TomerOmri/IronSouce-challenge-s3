const JwtStrategy = require('passport-jwt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const mockUserDB = {
  12345: {
    name: 'tomer',
    id: 12345,
  },
};

class Auth {

  initialize(secretJwt) {
    passport.use('jwt', this.getStrategy());
    this.secretJwt = secretJwt;

    return passport.initialize();
  }

  authenticate(callback) {
    return passport.authenticate('jwt', { session: false, failWithError: true }, callback);
  }

  getStrategy() {
    const params = {
      secretOrKey: this.secretJwt,
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

  // This method will call the user model in the DB and check if user exist
  async getUser (userId) {
    return mockUserDB[userId];
  }

}

module.exports = new Auth();
