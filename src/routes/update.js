const express = require('express');
const mongoDao = require('../services/file-metadata/mongo.dao');
const errorService = require('../utils/error-service');

module.exports = () => {
  let router = express.Router();

  router.patch('/', async (req, res, next) => {
    const { ownerId, fileName } = req.body;

    // todo  User is authenticated, we will search for this file on his files.

    try {
      const updatedFile = await mongoDao.updateFilePermission(ownerId, fileName);

      return res.status(200).send(`Updated: ${updatedFile}`);
    } catch (err) {
      if (err.statusCode)
        next(err);

      next(errorService('Something went wrong, please try again', 500));
    }
  });

  return router;
};
