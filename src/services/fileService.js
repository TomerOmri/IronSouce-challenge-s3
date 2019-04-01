const fs = require('fs');
const path = require('path');

exports.uploadFiles = async (files, destinationFolder) => {

    const uploadFileList = files.map (async (file) => {

        // TODO send to fs file saver service
        file.mv(path.resolve(destinationFolder, file.name));


        try {
            if (isPrivate && isPrivate === 'true') {
                if (!access_token) {
                    return res.status(400).send("Cannot complete private upload, please provide access_token");
                }

                return mongoDao.uploadPrivateFile(file, access_token);

                // const status = mongoDao.uploadPrivateFile(file, access_token);
                // return status;

            } else {
                return mongoDao.uploadPublicFile(file);

            }

        } catch (e) {
            console.log(e);
            res.status(500).send("Cannot upload file");
        }

    });

    const uploadedFiles = await Promise.all(uploadFileList);
    res.status(201).send(uploadedFiles);
}