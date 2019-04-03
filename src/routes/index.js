const express = require('express');
const Auth = require('../controllers/auth');

const uploadAPI = require('./upload');
const downloadAPI = require('./download');
const updateAPI = require('./update');
const deleteAPI = require('./delete');

module.exports = () => {
  const mainRouter = express.Router();

  mainRouter.use(Auth.initialize());
  mainRouter.use('/upload', uploadAPI());
  mainRouter.use('/download', downloadAPI());
  mainRouter.use('/update', updateAPI());
  mainRouter.use('/delete', deleteAPI());

  mainRouter.get('/heartbeat', async (req, res) => {
    return res.status(200).send('All good.');
  });

  mainRouter.use( (req, res, next) => {
    return res.status(404).send('404 - Nothing to see here');
  });

  return mainRouter;
};

