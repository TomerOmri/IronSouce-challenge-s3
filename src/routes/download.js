const express = require('express');
const path = require('path');
const mongoDao = require('../services/database/mongo.dao');
const fileService = require('../services/file-service');



module.exports = () => {
    let router = express.Router();

    // public download
    router.get('/', async (req, res) => {
        const { ownerId } = req.body;
        const { fileName, metadata } = req.query;

        if (!fileName || !ownerId) {
            res.status(400).send('Please provide file name');
        }

        const publicFile = await mongoDao.findFile(ownerId, fileName);

        if (publicFile.isPrivate) {
            return res.status(401).send("Not authorized.");
        }

        if (!publicFile || publicFile.length === 0 || publicFile.deletedAt) {
            return res.status(404).send('File is not exist');
        }

        if (metadata && metadata === 'true') {
            return res.status(200).send(fileService.getMetadataFromFile(publicFile));
        }

        res.status(200).download(path.join(fileService.getUserPath(publicFile.ownerId), publicFile.name));


    });

    // private download
    router.get('/:fileIdentifier', async (req, res) => {
        const { fileIdentifier } = req.params;
        const { access_token, metadata } = req.query;

            const privateFile = await mongoDao.findPrivateFile(fileIdentifier);

            if (!privateFile || privateFile.length === 0) {
                return res.status(404).send('File is not exist');
            }

            if (privateFile.access_token !== access_token) {
                return res.status(401).send("Not authorized.");
            }

            if (metadata && metadata === 'true') {
                return res.status(200).send(fileService.getMetadataFromFile(privateFile));
            }

            res.status(200).download(path.join(fileService.getUserPath(privateFile.ownerId), privateFile.name));

    });


    return router;
};