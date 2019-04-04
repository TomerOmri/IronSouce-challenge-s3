const express = require('express');
const fileService = require('../services/file-handler/file-handler');
const errorService = require('../utils/error-service');
const fileUtil = require('../utils/file-util');
const schema = require('../utils/schema-validation');
const validation = require('../middlewares/validate');

module.exports = () => {
  let router = express.Router();

  router.post('/', validation(schema), async (req, res, next) => {
    if (!req.files)
      next(errorService.BadRequest('No files were uploaded'));

    const { access_token } = req.body;
    const { ownerId } = req.userData;
    const { files } = req.files;
    let uploadedFiles = [];

    try {
      const destinationFolder = await fileUtil.createUserFilesDir(ownerId);
      uploadedFiles = await fileService.uploadFiles(files, destinationFolder, ownerId, access_token);
    } catch (err) {
      next(errorService.GeneralError('Something went wrong, please try again'));
    }

    return res.status(201).send(uploadedFiles);
  });

  return router;
};

