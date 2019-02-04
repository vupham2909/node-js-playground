const _ = require('lodash');

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.dev = process.env.NODE_ENV;

let envConfig;

try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  envConfig = require(`./${config.env}`);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
