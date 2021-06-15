// eslint-disable-next-line no-unused-vars
const express = require('express');

const UserController = require('./src/controllers/UserController');
const SessionController = require('./src/controllers/SessionController');

const routes = express.Router();

routes.post('/api/users/login', SessionController.login);
routes.post('/api/users', UserController.store);

module.exports = routes;
