'use strict';

const wyreRoutes = require("./wyre")

module.exports = {
    type: 'content-api',
    routes: [...wyreRoutes],
};