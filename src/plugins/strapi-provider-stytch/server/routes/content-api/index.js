'use strict';

const authRoutes = require('./auth');
const userRoutes = require("./user")

module.exports = {
    type: 'content-api',
    routes: [...authRoutes, ...userRoutes],
};