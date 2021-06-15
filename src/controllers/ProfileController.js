const User = require('../models/User');

class ProfileController {
  async get(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username }, include: ['Followers'] });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      let following = false;

      if (req.body.user) {
        const user = await User.findOne({ where: { username } });

        for (let i = 0; i < profile.Followers.length; i += 1) {
          if (profile.Followers[i] === user.id) {
            following = true;
          }
        }
      }

      const { bio, image } = profile;
      return res.json({
        profile: {
          username,
          bio,
          image,
          following
        }
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ProfileController();