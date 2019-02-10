const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  app.use(cors());
  debug('App Middleware are registered');
};
