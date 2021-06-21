// eslint-disable-next-line no-unused-vars
const express = require('express');

const authMiddleware = require('./src/middlewares/auth');

const UserController = require('./src/controllers/UserController');
const SessionController = require('./src/controllers/SessionController');
const ProfileController = require('./src/controllers/ProfileController');
const TagController = require('./src/controllers/TagController');
const ArticleController = require('./src/controllers/ArticleController');
const FavouriteController = require('./src/controllers/FavouriteController');

const routes = express.Router();

routes.post('/api/users/login', SessionController.login);

routes.post('/api/users', UserController.store);
routes.get('/api/user', authMiddleware, UserController.getCurrentUser);
routes.put('/api/user', authMiddleware, UserController.update);

routes.get('/api/profiles/:username', ProfileController.get);
routes.post('/api/profiles/:username/follow', authMiddleware, ProfileController.follow);
routes.delete('/api/profiles/:username/follow', authMiddleware, ProfileController.unfollow);

routes.post('/api/articles', authMiddleware, ArticleController.store);
routes.get('/api/articles/:slug', authMiddleware, ArticleController.get);

routes.get('/api/tags', TagController.listAll);

routes.post('/api/articles/:slug/favorite', authMiddleware, FavouriteController.favorite);
routes.delete('/api/articles/:slug/favorite', authMiddleware, FavouriteController.disfavor);

module.exports = routes;
