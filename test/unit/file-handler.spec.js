require('../../src/services/file-metadata/models/fileModel');
const chai = require('chai');
const fileUtil = require('../../src/utils/file-util');
const assert = chai.assert;

describe('File Service Unit Tests', () => {
  it('should include user path in upload directory', () => {
    const pathToDir = fileUtil.getFilePathByOwnerId('userId');
    assert.include(pathToDir, 'userId');
  });
});
