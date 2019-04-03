const config = require('../../config/config');
require('../../services/file-metadata/models/fileModel');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const chai = require('chai');
const fileUtil = require('../../utils/file-util');
const mockData = require('../_mock/mock.data');

const sinonTest = sinonTestFactory(sinon);
const assert = chai.assert;

describe('File Service Unit Tests', () => {
  it('should include user path in upload directory', () => {
    const pathToDir = fileUtil.getFilePathByOwnerId('userId');
    assert.include(pathToDir, 'userId');
  });
});
