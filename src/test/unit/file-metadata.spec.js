const config = require('../../config/config');
require('../../services/file-metadata/models/fileModel');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const chai = require('chai');
const mongoDao = require('../../services/file-metadata/mongo.dao');
const mockData = require('../_mock/mock.data');
const mongoose = require('mongoose');

const File = mongoose.model('File');

const sinonTest = sinonTestFactory(sinon);
const assert = chai.assert;

describe('File Metadata DB Unit Tests', () => {
  it('should update public file metadata in DB ', sinonTest(async function() {
    const mongoDBStub = this.stub(File, 'findOne').rejects(undefined);

    const uploadStatus = await mongoDao.uploadFile(mockData.publicFile, 'ownerTest');
    assert.include(uploadStatus, 'userId');
  }));
});
