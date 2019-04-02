const express = require('express');
const fileService = require('../services/file-handler/file-handler');
const errorService = require('../utils/error-service');
const fileUtil = require('../utils/file-util');

module.exports = () => {
  let router = express.Router();

  router.post('/', async (req, res, next) => {
    if (!req.files)
      next(errorService('No files were uploaded', 400));

    const { access_token, ownerId } = req.body;
    const { files } = req.files;
    let uploadedFiles = [];

    try {
      const destinationFolder = fileUtil.createUserFilesDir(ownerId);
      uploadedFiles = await fileService.uploadFiles(files, destinationFolder, ownerId, access_token);
    } catch (err) {
      next(errorService('Something went wrong, please try again', 500));
    }

    return res.status(201).send(uploadedFiles);
  });

  return router;
};

