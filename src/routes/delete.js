const express = require('express');
const mongoDao = require('../services/database/mongo.dao');
const fileService = require('../services/fileService');

module.exports = () => {
    let router = express.Router();

    router.delete('/', async (req, res) => {
        const { fileName, ownerId, access_token } = req.body;

        // todo check if user has permission to delete this file

        try {
            const fileToDelete = mongoDao.findFile(ownerId, fileName);
            if (!fileToDelete) {
                return res.status(404).send(`file: ${fileName} - not found.`);
            }

            await fileService.deleteFile(ownerId, fileName);
            await mongoDao.deleteFile(ownerId, fileName);

            return res.status(200).send(`${fileName} Deleted successfully`);

        } catch (e) {
            return res.status(500).send("Couldn't delete file");
        }

    });


    return router;
};