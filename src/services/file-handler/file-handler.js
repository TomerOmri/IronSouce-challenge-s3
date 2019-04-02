const fs = require('fs-extra');
const path = require('path');
const mongoDao = require('../file-metadata/mongo.dao');
const fileUtil = require('../../utils/file-util');

exports.uploadFiles = async (files, destinationFolder, ownerId, access_token) => {
  if (!Array.isArray(files))
    files = [files];

  return Promise.all(files.map (async file => {
    try {
      await file.mv(path.resolve(destinationFolder, file.name));

      return mongoDao.uploadFile(file, ownerId, access_token);
    } catch (e) {
      throw new Error();
    }
  }));
};

exports.deleteFile = async (ownerId, fileName) => {
  const destinationFolder = fileUtil.getFilePathByOwnerId(ownerId);

  return await fs.remove(`${destinationFolder}/${fileName}`);
};

exports.getMetadataFromFile = file => {
  let fileMetadata = {
    file_name: file.name,
    file_size: file.size,
    created_at: file.createdAt,
  };

  if (file.deletedAt)
    fileMetadata.deleted_at = file.deletedAt;

  return fileMetadata;
};
