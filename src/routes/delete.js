const express = require('express');
const mongoDao = require('../services/file-metadata/mongo.dao');
const fileService = require('../services/file-handler/file-handler');
const errorService = require('../utils/error-service');

module.exports = () => {
  let router = express.Router();

  router.delete('/', async (req, res, next) => {
    const { fileName, ownerId } = req.body;

    // todo check if user has permission to delete this file

    try {
      const fileToDelete = mongoDao.findFile(ownerId, fileName);
      if (!fileToDelete)
        next(errorService('file is not exist', 404));

      await fileService.deleteFile(ownerId, fileName);
      await mongoDao.deleteFile(ownerId, fileName);

      return res.status(200).send(`${fileName} Deleted successfully`);
    } catch (err) {
      next(errorService('Couldn\'t delete file', 500));
    }

    return null;
  });

  return router;
};
