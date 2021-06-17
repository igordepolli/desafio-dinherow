const Tag = require('../models/Tag');

class TagController {
  async listAll(req, res) {
    try {
      const promiseTags = await Tag.findAll();
      const tags = [];

      if (promiseTags) {
        // eslint-disable-next-line no-restricted-syntax
        for (const tag of promiseTags) {
          tags.push(tag.dataValues.name);
        }
      }

      return res.status(200).json({ tags });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TagController();