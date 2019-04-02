const express = require('express');
const uploadAPI = require('./upload');
const downloadAPI = require('./download');
const updateAPI = require('./update');
const deleteAPI = require('./delete');

const config = require('../config/config');
const Auth = require('../controllers/auth');

module.exports = () => {
  const mainRouter = express.Router();

  mainRouter.use(Auth.initialize(config.secretJwt));
  mainRouter.use('/upload', uploadAPI());
  mainRouter.use('/download', downloadAPI());
  mainRouter.use('/update', updateAPI());
  mainRouter.use('/delete', deleteAPI());

  mainRouter.get('/heartbeat', async (req, res) => {
    res.status(200).send('All good.');
  });

  return mainRouter;
};

