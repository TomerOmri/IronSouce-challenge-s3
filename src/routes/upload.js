const express = require('express');
const mongoDao = require('../services/database/mongo.dao');
const fileService = require('../services/fileService');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');




module.exports = () => {
    let router = express.Router();

    router.post('/', async (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded');
        }

        const { files } = req.files;
        const { isPrivate, access_token, ownerId } = req.body;



        const destinationFolder = path.join(path.resolve(__dirname, '../../'), 'files', ownerId);
        if (!fs.existsSync(destinationFolder)){
            mkdirp(destinationFolder);
        }


        return await fileService.uploadFiles(files, destinationFolder);

        // const uploadFileList = files.map (async (file) => {
        //
        //     // TODO send to fs file saver service
        //
        //     try {
        //         if (isPrivate && isPrivate === 'true') {
        //             if (!access_token) {
        //                 return res.status(400).send("Cannot complete private upload, please provide access_token");
        //             }
        //
        //             return mongoDao.uploadPrivateFile(file, access_token);
        //
        //             // const status = mongoDao.uploadPrivateFile(file, access_token);
        //             // return status;
        //
        //     } else {
        //         return mongoDao.uploadPublicFile(file);
        //
        //     }
        //
        //     } catch (e) {
        //         console.log(e);
        //         res.status(500).send("Cannot upload file");
        //     }
        //
        // });

        //
        // const uploadedFiles = await Promise.all(uploadFileList);
        // res.status(201).send(uploadedFiles);

    });

    return router;
};

