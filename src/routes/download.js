const express = require('express');
const path = require('path');
const mongoDao = require('../services/file-metadata/mongo.dao');
const fileService = require('../services/file-handler/file-handler');
const errorService = require('../utils/error-service');

module.exports = () => {
    let router = express.Router();

    // public download
    router.get('/', async (req, res, next) => {
        const { ownerId } = req.body;
        const { fileName, metadata } = req.query;

        if (!fileName || !ownerId) {
            next(errorService('Please provide file name', 400));
        }

        const publicFile = await mongoDao.findFile(ownerId, fileName);

        if (publicFile.isPrivate) {
            next(errorService('Not authorized.', 401));
        }

        if (!publicFile || publicFile.length === 0 || publicFile.deletedAt) {
            next(errorService('File is not exist', 404));
        }

        if (metadata && metadata === 'true') {
            return res.status(200).send(fileService.getMetadataFromFile(publicFile));
        }

        res.status(200).download(path.join(fileService.getFilePathByOwnerId(publicFile.ownerId), publicFile.name));


    });

    // private download
    router.get('/:fileIdentifier', async (req, res) => {
        const { fileIdentifier } = req.params;
        const { access_token, metadata } = req.query;

            const privateFile = await mongoDao.findPrivateFile(fileIdentifier, access_token);

            if (!privateFile || privateFile.length === 0) {
                next(errorService('File is not exist', 404));
            }

            if (metadata && metadata === 'true') {
                return res.status(200).send(fileService.getMetadataFromFile(privateFile));
            }

            res.status(200).download(path.join(fileService.getFilePathByOwnerId(privateFile.ownerId), privateFile.name));

    });


    return router;
};
