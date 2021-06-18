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

      if (req.userId) {
        const user = await User.findByPk(req.userId);

        if (user) {
          for (const follower of profile.Followers) {
            if (follower.dataValues.id === user.id) {
              following = true;
            }
          }
        }
      }

      const { bio, image } = profile;
      return res.status(200).json({
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

  async follow(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username }, include: ['Followers'] });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      const user = await User.findByPk(req.userId);

      for (const follower of profile.Followers) {
        if (follower.dataValues.id === user.id) {
          throw new Error('You already follow this profile!');
        }
      }

      await profile.addFollowers(user);

      const following = true;
      const { bio, image } = profile;
      return res.status(200).json({
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

  async unfollow(req, res) {
    try {
      const { username } = req.params;

      const profile = await User.findOne({ where: { username }, include: ['Followers'] });

      if (!profile) {
        throw new Error(`Profile ${username} not found!`);
      }

      const user = await User.findByPk(req.userId);

      const { bio, image } = profile;
      for (const follower of profile.Followers) {
        if (follower.dataValues.id === user.id) {
          await profile.removeFollowers(user);
          const following = false;
          return res.status(200).json({
            profile: {
              username,
              bio,
              image,
              following
            }
          });
        }
      }

      throw new Error("You don't follow this profile!");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ProfileController();