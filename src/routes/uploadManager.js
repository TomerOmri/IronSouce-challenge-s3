const express = require('express');
const mongoose = require('mongoose');
const File = mongoose.model('File');


module.exports = () => {
    let router = express.Router();

    router.post('/', async (req, res) => {
        const newFile = new File(req.body);

        try {
            await newFile.save();
            return res.json({file: newFile});
        } catch (e) {
            console.log(e);
            res.status(500).send("Cannot upload file");
        }
    });

    return router;
};