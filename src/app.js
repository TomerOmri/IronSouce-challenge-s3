const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config.js');
require('./models/fileModel');

config.runMongo();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


require('./routes')(app);

const appPort = config.getPort();
app.listen(appPort, () => { console.log(`S3 is Running on port ${appPort}`); });