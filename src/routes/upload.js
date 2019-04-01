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

        const { access_token, ownerId } = req.body;
        const { files } = req.files;
        let uploadedFiles = [];


        try {
            const destinationFolder = fileService.createUserFilesDir(ownerId);
            uploadedFiles = await fileService.uploadFiles(files, destinationFolder, access_token);
        } catch (e) {
            return res.status(500).send("Something went wrong, please try again");
        }

        return res.status(201).send(uploadedFiles);
    });

    return router;
};

