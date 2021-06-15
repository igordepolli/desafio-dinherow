// eslint-disable-next-line no-unused-vars
const express = require('express');

const UserController = require('./src/controllers/UserController');

const routes = express.Router();

routes.post('/signup', UserController.create);

module.exports = routes;
