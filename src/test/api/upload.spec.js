const config = require('../../config/config');
require('../../services/file-metadata/models/fileModel');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const chai = require('chai');
const fileService = require('../../services/file-handler/file-service');
const mockData = require('../_mock/mock.data');
const request = require('supertest');

const sinonTest = sinonTestFactory(sinon);
const assert = chai.assert;

let app = require('../../app');

describe('Upload API Tests', () => {
  it('should validate heartbeat', sinonTest(function() {
    return request(app)
      .get('/heartbeat')
      .expect(200);
  }));

  it('should validate heartbeat2', () => {
    return request(app)
      .get('/upload/heartbeat')
      .expect(200);
  });
  //
  // it('should Upload file to fileSystem', sinonTest(function() {
  //   let uploadStub = this.stub(fileService, 'uploadFiles').resolves(mockData.mockFile);
  //   let body = { ownerId: 'tomer', access_token: 'omri' };
  //
  //   return request(app)
  //     .post('/upload')
  //     .attach('file', 'src/test/_mock/dummyFile.ico')
  //     .expect(mockData.mockFile)
  //     .expect(201);
  // }));
});
