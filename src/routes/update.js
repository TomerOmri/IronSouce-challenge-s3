const express = require('express');
const mongoDao = require('../services/database/mongo.dao');


module.exports = () => {
    let router = express.Router();

    router.patch('/', async (req, res) => {
        const { ownerId, fileName, access_token } = req.body;

        // todo check if user has permission to change this file, updateFilePerm already does so?



        try {
            // todo check if file exist

            const updatedFile = await mongoDao.updateFilePermission(ownerId, fileName, access_token);

            return res.status(200).send(`Updated: ${updatedFile}`);

        } catch (e) {
            return res.status(500).send("Couldn't update file");
        }

    });


    return router;
};