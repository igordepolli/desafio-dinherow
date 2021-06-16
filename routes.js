// eslint-disable-next-line no-unused-vars
const express = require('express');

const authMiddleware = require('./src/middlewares/auth');

const UserController = require('./src/controllers/UserController');
const SessionController = require('./src/controllers/SessionController');
const ProfileController = require('./src/controllers/ProfileController');

const routes = express.Router();

routes.post('/api/users/login', SessionController.login);
routes.post('/api/users', UserController.store);

routes.get('/api/profiles/:username', ProfileController.get);
routes.post('/api/profiles/:username/follow', authMiddleware, ProfileController.follow);

module.exports = routes;
