'use strict';

const bootstrap = require('./bootstrap');
const destroy = require('./destroy');
const config = require('./config');
const controllers = require('./controllers');
const routes = require('./routes');
const policies = require('./policies');
const services = require('./services');

module.exports = {
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  policies,
};
