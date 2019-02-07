const debug = require('debug')('app');

module.exports = (err, req, res, next) => {
  debug(err);
  res.status(500);
  res.send(`error: ${err.message}`);
};
