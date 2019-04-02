const fs = require('fs-extra');
const path = require('path');
const mongoDao = require('./database/mongo.dao');
const mkdirp = require('mkdirp');


exports.uploadFiles = async (files, destinationFolder, ownerId, access_token) => {
    if (!Array.isArray(files)) {
        files = [files];
    }

    const uploadFileList = files.map (async (file) => {

        try {
            await file.mv(path.resolve(destinationFolder, file.name));
            return mongoDao.uploadFile(file, ownerId, access_token);
        } catch (e) {
            throw new Error();
        }
    });

    return await Promise.all(uploadFileList);
};

exports.createUserFilesDir = (ownerId) => {

    const destinationFolder = this.getUserPath(ownerId);

    if (!fs.existsSync(destinationFolder)){
         mkdirp(destinationFolder);
    }

    return destinationFolder;
};

exports.deleteFile = async (ownerId, fileName) => {
    const destinationFolder = this.getUserPath(ownerId);
    return await fs.remove(`${destinationFolder}/${fileName}`);
};

exports.getMetadataFromFile = (file) => {
    let fileMetadata = {
        file_name: file.name,
        file_size: file.size,
        created_at: file.createdAt
    };

    if (file.deletedAt) {
        fileMetadata.deleted_at = file.deletedAt
    }

    return fileMetadata;
};

exports.getUserPath = (ownerId) => {
    return path.join(path.resolve(__dirname, '../../'), 'files', ownerId);
};