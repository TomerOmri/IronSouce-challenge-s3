require('../../src/services/file-metadata/models/fileModel');
const request = require('supertest');

let app = require('../../src/app');

describe('Upload API Tests', () => {
  it('should check heartbeat public api ', () => {
    return request(app)
      .get('/heartbeat')
      .expect(200);
  });

  it('should return 401 when access private api ', () => {
    return request(app)
      .get('/upload')
      .expect(401);
  });
});
