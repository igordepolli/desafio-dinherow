const User = require('../models/User');

class ProfileController {
  async follow(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username }, include: ['Followers'] });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      const { email } = req.body.user;
      const user = await User.findOne({ where: { email } });

      // eslint-disable-next-line no-restricted-syntax
      for (const i of profile.Followers) {
        if (i.dataValues.id === user.id) {
          throw new Error('You already follow this profile!');
        }
      }

      await profile.addFollowers(user);

      return res.status(200).json({ message: 'Following!' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username }, include: ['Followers'] });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      let following = false;

      if (req.body.user) {
        const user = await User.findOne({ where: { email: req.body.user.email } });

        if (user) {
        // eslint-disable-next-line no-restricted-syntax
          for (const i of profile.Followers) {
            if (i.dataValues.id === user.id) {
              following = true;
            }
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