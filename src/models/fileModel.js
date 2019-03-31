var mongoose = require('mongoose');

let File = new mongoose.Schema({
    fileName: String
});


module.exports = mongoose.model('File', File);