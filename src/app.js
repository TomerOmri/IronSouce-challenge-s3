const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config/config.js');
const errorHandler = require('./services/error-handler');
require('./services/database/models/fileModel');

config.runMongo();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
require('./routes')(app);
app.use(errorHandler);


const appPort = config.getPort();
app.listen(appPort, () => { console.log(`S3 is Running on port ${appPort}`); });

module.exports = app;