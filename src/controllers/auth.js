const JwtStrategy = require('passport-jwt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('config');

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
      secretOrKey: config.get('secretJwt'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    return new JwtStrategy.Strategy(params, async (payload, done) => {
      try {
        const user = await this.getUser(payload.ownerId);

        if (user === null)
          return done(null, false, { message: 'The user in the token was not found' });

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    });
  }

  // This method will call the user model in the DB and check if user exist
  // since there is no sign up-login platform yet, we will validate with mock data
  async getUser (ownerId) {
    return mockUserDB[ownerId];
  }

}

const mockUserDB = {
  jk12x9: {
    name: 'tomer',
    ownerId: 'jk12x9',
  },
  k9a6x: {
    name: 'tomer',
    ownerId: 'k9a6x',
  },
  kao11x: {
    name: 'elvis',
    ownerId: 'kao11x',
  },
  heyJude: {
    name: 'beatels',
    ownerId: 'heyJude',
  },
};

module.exports = new Auth();
