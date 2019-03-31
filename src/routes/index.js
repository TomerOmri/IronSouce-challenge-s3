const express = require('express');
const uploadManager = require('./uploadManager');

module.exports = (app) => {
    const mainRouter = express.Router();


    mainRouter.use('/upload', uploadManager());


    mainRouter.get('/heartbeat', async (req, res) => {
        res.status(200).send("All good.")
    });

    app.use('/', mainRouter);
};