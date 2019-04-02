const config = require('../../config/config');
require('../../services/file-metadata/models/fileModel');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const chai = require('chai');
const fileService = require('../../services/file-handler/file-service');
const mockData = require('../_mock/mock.data');

const sinonTest = sinonTestFactory(sinon);
const assert = chai.assert;


describe('File Service Unit Tests', () => {
    describe('OS Integration', () => {
        it('should include user path in writing directory', sinonTest(function() {
            const pathToDir = fileService.getFilePathByOwnerId('userId');
            assert.include(pathToDir, 'userId')
        }));

        // it('should get metadata from file', sinonTest(function() {
        //     const metadata = fileService.getMetadataFromFile(mockData.mockFile);
        //     assert.equal(metadata, mockData.assertions.metadataFile);
        // }));
});
});