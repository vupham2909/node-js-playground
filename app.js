const express = require('express');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const config = require('./src/config/config');
const api = require('./src/routes/routers');
const globalExceptionHandler = require('./src/middleware/globalExceptionHandler');
const notFound = require('./src/middleware/notFound');

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

const app = express();

require('./src/middleware/appMiddleware')(app);

app.use('/api', api);

app.use(globalExceptionHandler);

app.use(notFound);

app.server = app.listen(config.port, () => {
  debug(`Node is listening on ${config.port} `);
});

module.exports = app;
