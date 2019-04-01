const express = require('express');
const mongoDao = require('../services/database/mongo.dao');


module.exports = () => {
    let router = express.Router();

    router.get('/heartbeat', async (req, res) => {
        res.status(200).send("All good.")
    });

    // public download
    router.get('/:ownerId/:fileName', async (req, res) => {
        const { ownerId, fileName } = req.params;
        const { metadata, access_token } = req.query;

        if (!fileName || !ownerId) {
            res.status(400).send('Please provide owner id and file name to download file');
        }

        if (access_token) {
            // private flow, we will search file by secret
            // const fileToDownload = await File.findOne({ownerId: ownerId, secretId: fileName});

            const fileToDownload = await mongoDao.findOnePrivateFile(ownerId, fileName);

            if (!fileToDownload || fileToDownload.length === 0) {
                return res.status(404).send('File is not exist');
            }

            if (fileToDownload.access_token !== access_token) {
                return res.status(401).send("Seems like you don't have the right permissions to download this file")
            }

            if (metadata && metadata === true) {
                return res.status(200).send({
                    file_name: fileToDownload.name,
                    file_size: fileToDownload.size,
                    created_at: fileToDownload.createdAt

                })
            }


            // validated, no need for user validation, anyone with the right access token and secret can download
            // the file
            return res.status(200).send();
            //TODO: implement download fs


        } else {

            // public flow, we will search by name
            const fileToDownload = await mongoDao.findOnePublicFile(ownerId, fileName);

            if (!fileToDownload || fileToDownload.length === 0) {
                return res.status(404).send('File is not exist');
            }

            if (metadata) {
                res.status(200).send({
                    file_name: fileToDownload.name,
                    file_size: fileToDownload.size,
                    created_at: fileToDownload.createdAt

                })
            }
        }





    });

    return router;
};