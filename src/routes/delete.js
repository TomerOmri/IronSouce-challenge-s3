const express = require('express');
const mongoDao = require('../services/file-metadata/mongo.dao');
const fileService = require('../services/file-handler/file-handler');
const errorService = require('../utils/error-service');

module.exports = () => {
  let router = express.Router();

  router.delete('/', async (req, res, next) => {
    const { fileName, ownerId } = req.body;

    try {
      const fileToDelete = mongoDao.findFile(ownerId, fileName);
      if (!fileToDelete)
        next(errorService.NotFound('file is not exist'));

      await fileService.deleteFile(ownerId, fileName);
      await mongoDao.deleteFile(ownerId, fileName);

      return res.status(200).send(`${fileName} Deleted successfully`);
    } catch (err) {
      next(errorService.GeneralError('Couldn\'t delete file'));
    }

    return null;
  });

  return router;
};
