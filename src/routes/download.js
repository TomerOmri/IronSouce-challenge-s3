const express = require('express');
const path = require('path');
const mongoDao = require('../services/file-metadata/mongo.dao');
const errorService = require('../utils/error-service');

const fileService = require('../services/file-handler/file-handler');
const fileUtil = require('../utils/file-util.js');

module.exports = () => {
  let router = express.Router();

  // public download
  router.get('/', async (req, res, next) => {
    const { ownerId } = req.body;
    const { fileName, metadata } = req.query;

    if (!fileName || !ownerId)
      next(errorService.BadRequest('Please provide file name'));

    const publicFile = await mongoDao.findFile(ownerId, fileName);

    if (publicFile.isPrivate)
      next(errorService.NotAuthorized('Not authorized.'));

    if (!publicFile || publicFile.length === 0 || publicFile.deletedAt)
      next(errorService.NotFound('File is not exist'));

    if (metadata && metadata === 'true')
      return res.status(200).send(fileService.getMetadataFromFile(publicFile));

    return res.status(200).download(path.join(fileUtil.getFilePathByOwnerId(publicFile.ownerId), publicFile.name));
  });

  // private download
  router.get('/:fileIdentifier', async (req, res, next) => {
    const { fileIdentifier } = req.params;
    const { access_token, metadata } = req.query;

    const privateFile = await mongoDao.findPrivateFile(fileIdentifier, access_token);

    if (!privateFile || privateFile.length === 0)
      next(errorService.NotFound('File is not exist'));

    if (metadata && metadata === 'true')
      return res.status(200).send(fileService.getMetadataFromFile(privateFile));

    return res.status(200).download(path.join(fileUtil.getFilePathByOwnerId(privateFile.ownerId), privateFile.name));
  });

  return router;
};
