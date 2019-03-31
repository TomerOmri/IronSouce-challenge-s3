const mongoose = require('mongoose');

let File = new mongoose.Schema({
    fileName: String,
    fileSize: Number,
    isPrivate: Boolean,
    ownerId: String,
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date
});


module.exports = mongoose.model('File', File);