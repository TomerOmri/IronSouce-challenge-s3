const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

exports.createUserFilesDir = ownerId => {
  const destinationFolder = getFilePathByOwnerId(ownerId);

  if (!fs.existsSync(destinationFolder))
    mkdirp(destinationFolder);

  return destinationFolder;
};

exports.getFilePathByOwnerId = ownerId => {
  return path.join(path.resolve(__dirname, '../../'), 'files', ownerId);
};
