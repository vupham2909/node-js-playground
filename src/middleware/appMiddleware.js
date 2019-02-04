const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  debug('App Middleware are registered');
};
