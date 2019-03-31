const express = require('express');
const mongoose = require('mongoose');
const File = mongoose.model('File');

module.exports = (app) => {
    const mainRouter = express.Router();

    mainRouter.get('/heartbeat', async (req, res) => {
        res.status(200).send("All good.")
    });

    mainRouter.post('/uploadFile', async (req, res) =>{
        const file = new File(req.body);

        try {
            await file.save();
            return res.json({file: file});
        } catch (e) {
            console.log(err);
            res.status(500).send("Cannot upload file");
        }
    });


    app.use('/', mainRouter);
};