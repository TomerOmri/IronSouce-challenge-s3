const express = require('express');
const mongoDao = require('../services/file-metadata/mongo.dao');
const errorService = require('../utils/error-service');

module.exports = () => {
  let router = express.Router();

  router.patch('/', async (req, res, next) => {
    const { fileName } = req.body;
    const { ownerId } = req.userData;

    try {
      const updatedFile = await mongoDao.updateFilePermission(ownerId, fileName);

      return res.status(200).send(`Updated: ${updatedFile}`);
    } catch (err) {
      if (err.statusCode)
        next(err);

      next(errorService.GeneralError('Something went wrong, please try again'));
    }

    return null;
  });

  return router;
};
