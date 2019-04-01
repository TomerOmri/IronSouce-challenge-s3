const mongoose = require('mongoose');
const uuid = require('uuid');

let File = new mongoose.Schema({
    name: String,
    size: Number,
    isPrivate: { type: Boolean, default: false },
    ownerId: { type: String, default: "tomer"},
    secretId: { type: String, default: uuid.v1},
    access_token: String,
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date
});


module.exports = mongoose.model('File', File);