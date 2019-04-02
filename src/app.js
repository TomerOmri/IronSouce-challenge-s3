const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config/config.js');
const errorHandler = require('./middlewares/error-handler');
const authMiddleware = require('./middlewares/auth');
require('./services/file-metadata/models/fileModel');
const routes = require('./routes');

config.runMongo();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(authMiddleware);
app.use('/', routes());
app.use(errorHandler);

const appPort = config.getPort();
app.listen(appPort, () => {
  console.log(`S3 is Running on port ${appPort}`);
});

module.exports = app;
