const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtConfig = require('../utils/jwt');

class SessionController {
  async login(req, res) {
    try {
      const { email, password } = req.body.user;

      const user = await User.findOne({ where: { email } });
      if (!user) { throw new Error('User not found!'); }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) { throw new Error('Incorrect password!'); }

      const {
        id, username, bio, image
      } = user;
      return res.status(200).json({
        user: {
          email,
          token: jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn }),
          username,
          bio,
          image
        }
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new SessionController();