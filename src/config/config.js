const mongoose = require('mongoose');

module.exports = {
    getPort: function() {
        return process.env.PORT || 8080;
    },

    runMongo: function() {
        const mongoDB = 'mongodb://127.0.0.1:27017/ironSource';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        mongoose.set('debug', true);
    }
}
