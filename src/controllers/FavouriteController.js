const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');

class FavouriteController {
  async favorite(req, res) {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ where: { slug }, include: Tag });

      if (!article) { throw new Error('Article not found!'); }

      const author = await User.findByPk(article.UserId);

      await article.addUsers(req.userId);
      const countFauvorites = await article.countUsers();

      return res.status(200).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new FavouriteController();