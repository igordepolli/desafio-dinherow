const User = require('../models/User');

class ProfileController {
  async get(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username } });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      // let following = false;

      const user = await User.findByPk(req.user.id);

      const { bio, image } = profile;
      return res.json({
        profile: {
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

module.exports = new ProfileController();