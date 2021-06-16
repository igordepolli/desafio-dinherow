const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {
  async store(req, res) {
    try {
      const {
        email, username, bio, image
      } = req.body.user;

      if (!email) {
        throw new Error('Email is required!');
      }
      if (!username) {
        throw new Error('Username is required!');
      }
      if (!req.body.user.password) {
        throw new Error('Password is required!');
      }

      if (await User.findOne({ where: { email } }) != null) {
        throw new Error(`E-mail ${email} already exists!`);
      }

      if (await User.findOne({ where: { username } }) != null) {
        throw new Error(`User ${username} already exists!`);
      }

      const password = await bcrypt.hash(req.body.user.password, 8);

      const user = await User.create({
        email,
        username,
        password,
        bio,
        image
      });

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        throw new Error('User not found!');
      }

      const [, token] = req.headers.authorization.split(' ');
      user.dataValues.token = token;
      delete user.dataValues.password;

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();