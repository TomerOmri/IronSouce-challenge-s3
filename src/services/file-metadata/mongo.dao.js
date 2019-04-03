const mongoose = require('mongoose');
const File = mongoose.model('File');
const randomstring = require('randomstring');
const errorService = require('../../utils/error-service');

// Upload
exports.uploadFile = async (file, ownerId, access_token) => {
  const fileInDB = await File.findOne({ ownerId: ownerId, name: file.name });

  if (!fileInDB) {
    try {
      let fileToUpload = new File(file);
      fileToUpload.ownerId = ownerId;

      if (access_token){
        fileToUpload.isPrivate = true;
        fileToUpload.access_token = access_token;
      }

      return await fileToUpload.save();
    } catch (e) {
      throw e;
    }
  } else {
    return fileInDB;
  }
};

// Find
exports.findPrivateFile = async (fileIdentifier, access_token) => {
  return await File.findOne({ secretId: fileIdentifier, access_token: access_token });
};

exports.findFile = async (ownerId, fileName) => {
  return await File.findOne({ ownerId: ownerId, name: fileName });
};

// Update
exports.updateFilePermission = async (ownerId, fileName) => {
  const fileToUpdate = await File.findOne({ ownerId: ownerId, name: fileName });
  if (!fileToUpdate || fileToUpdate.deletedAt)
    throw errorService.NotFound('File not found');

  fileToUpdate.isPrivate = !fileToUpdate.isPrivate;

  if (!fileToUpdate.access_token)
    fileToUpdate.access_token = randomstring.generate(10);

  return await fileToUpdate.save();
};

// Delete
exports.deleteFile = async (ownerId, fileName) => {
  return await File.findOneAndUpdate({ ownerId: ownerId, name: fileName }, { deletedAt: Date.now() });
};
