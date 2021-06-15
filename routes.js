// eslint-disable-next-line no-unused-vars
const express = require('express');

const UserController = require('./src/controllers/UserController');
const SessionController = require('./src/controllers/SessionController');
const ProfileController = require('./src/controllers/ProfileController');

const routes = express.Router();

routes.post('/api/users/login', SessionController.login);
routes.post('/api/users', UserController.store);

routes.get('/api/profiles/:username', ProfileController.get);

module.exports = routes;
