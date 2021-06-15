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

      return res.json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();