const express = require('express');
const fileService = require('../services/file-service');


module.exports = () => {
    let router = express.Router();

    router.post('/login', async (req, res) => {

    });

    return router;
};

