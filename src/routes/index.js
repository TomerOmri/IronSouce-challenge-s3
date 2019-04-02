const express = require('express');
const loginAPI = require('./login');
const uploadAPI = require('./upload');
const downloadAPI = require('./download');
const updateAPI = require('./update');
const deleteAPI = require('./delete');

module.exports = (app) => {
    const mainRouter = express.Router();

    mainRouter.use('/login', loginAPI());
    mainRouter.use('/upload', uploadAPI());
    mainRouter.use('/download', downloadAPI());
    mainRouter.use('/update', updateAPI());
    mainRouter.use('/delete', deleteAPI());

    mainRouter.get('/heartbeat', async (req, res) => {
        res.status(200).send("All good.")
    });

    app.use('/', mainRouter);
};

