const path = require('path');
const mkdirp = require('mkdirp');

exports.getFilePathByOwnerId = ownerId => {
  return path.join(path.resolve(__dirname, '../../'), 'files', ownerId);
};

exports.createUserFilesDir = ownerId => {
  const destinationFolder = fileUtil.getFilePathByOwnerId(ownerId);

  if (!fs.existsSync(destinationFolder))
    mkdirp(destinationFolder);

  return destinationFolder;
};
