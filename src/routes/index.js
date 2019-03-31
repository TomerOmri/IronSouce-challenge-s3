const express = require('express');


module.exports = (app) => {
    const mainRouter = express.Router();

    mainRouter.get('/heartbeat', async (req, res) => {
        res.status(200).send("All good.")
    });


    app.use('/', mainRouter);
};