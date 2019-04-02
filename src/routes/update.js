const express = require('express');
const mongoDao = require('../services/database/mongo.dao');
const validatorService = require('../services/validator-service');

module.exports = () => {
    let router = express.Router();

    router.patch('/', async (req, res) => {
        const { ownerId, fileName } = req.body;

        // todo  User is authenticated, we will search for this file on his files.

        try {
            const updatedFile = await mongoDao.updateFilePermission(ownerId, fileName);

            return res.status(200).send(`Updated: ${updatedFile}`);

        } catch (e) {
            // todo: if updateFilePermission throws 404  - return not found
            return res.status(500).send("Couldn't update file");
        }

    });


    return router;
};