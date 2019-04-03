const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');

function getFilePathByOwnerId (ownerId) {
  return path.join(path.resolve(__dirname, '../../'), 'files', ownerId);
}

module.exports = {
  createUserFilesDir: async ownerId => {
    const destinationFolder = getFilePathByOwnerId(ownerId); // todo fix to method

    if (!fs.existsSync(destinationFolder))
      await fs.ensureDir(destinationFolder);

    return destinationFolder;
  },

  getFilePathByOwnerId: getFilePathByOwnerId,
};
