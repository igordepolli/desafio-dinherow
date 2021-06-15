const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {
  async create(req, res) {
    try {
      const {
        email, username, bio, image
      } = req.body;

      let { password } = req.body;

      if (await User.findOne({ where: { email } }) != null) {
        throw new Error(`E-mail ${email} already exists!`);
      }

      if (await User.findOne({ where: { username } }) != null) {
        throw new Error(`User ${username} already exists!`);
      }

      password = await bcrypt.hash(password, 8);

      const user = await User.create({
        email, username, password, bio, image
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();