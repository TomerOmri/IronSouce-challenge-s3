const mongoose = require('mongoose');

let envVariables = {
  port: process.env.PORT || 8080,
  publicRoutes: ['/download', '/heartbeat'],
  secretJwt: process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm12912',
  mongoAddress: process.env.MONGO || 'mongodb://127.0.0.1:27017/ironSource',
};

module.exports = {
  runMongo: () => {
    const mongoDB = envVariables.mongoAddress;
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    mongoose.set('debug', true);
  },

  envVariables: envVariables,
};
