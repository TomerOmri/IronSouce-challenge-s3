const mongoose = require('mongoose');
const config = require('config');

module.exports = {
  runMongo: () => {
    const mongoDB = config.get('dbConfig.mongo');
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    mongoose.set('debug', true);
  },
};
