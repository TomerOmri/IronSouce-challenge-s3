const express = require('express');
const mongoDao = require('../services/database/mongo.dao');


module.exports = () => {
    let router = express.Router();

    router.delete('/', async (req, res) => {
        const { isPrivate, access_token, fileName } = req.body;
        let ownerId = "tomer";

        // todo check if user has permission to change this file, updateFilePerm already does so?
        // todo delete from fs

        try {
            // await mongoDao.deleteFile(ownerId, fileName, isPrivate);

            return res.status(200).send("Deleted succussfully");

        } catch (e) {
            return res.status(500).send("Couldn't update file");
        }

    });


    return router;
};