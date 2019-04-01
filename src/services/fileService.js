const fs = require('fs');
const path = require('path');
const mongoDao = require('./database/mongo.dao');
const ErrorCodes = require('./ErrorCodes');
const mkdirp = require('mkdirp');


exports.uploadFiles = async (files, destinationFolder, access_token) => {
    if (!Array.isArray(files)) {
        files = [files];
    }

    const uploadFileList = files.map (async (file) => {

        try {
            await file.mv(path.resolve(destinationFolder, file.name));
        } catch (e) {
            throw new Error(ErrorCodes.CANT_PLACE_FILE);
        }

        try {
            if (access_token) {
                return mongoDao.uploadPrivateFile(file, access_token);

            } else {
                return mongoDao.uploadPublicFile(file);

            }
        } catch (e) {
            // TODO: remove file if new & DB failed
            throw new Error(ErrorCodes.DB_ERROR);
        }


    });

    return await Promise.all(uploadFileList);
};

exports.createUserFilesDir = (ownerId) => {

    const destinationFolder = path.join(path.resolve(__dirname, '../../'), 'files', ownerId);

    if (!fs.existsSync(destinationFolder)){
         mkdirp(destinationFolder);
    }

    return destinationFolder;
};