const express = require('express');
const config = require('./config/config.js');
const app = express();


require('./routes')(app);

const appPort = config.getPort();
app.listen(appPort, () => { console.log(`S3 is Running on port ${appPort}`); });