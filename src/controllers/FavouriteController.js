const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');

const { formatOutputArticle } = require('../utils/FormatOutputs');

class FavouriteController {
  async bookmark(req, res) {
    try {
      const { slug } = req.params;
      let article = await Article.findOne({ where: { slug }, include: Tag });

      if (!article) { throw new Error('Article not found!'); }

      await article.addFavourites(req.userId);

      const user = await User.findByPk(req.userId, { include: ['Favourites'] });
      const author = await User.findByPk(article.UserId, { include: ['Followers'] });

      article = formatOutputArticle(article, author, user);
      return res.status(200).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async removeBookmark(req, res) {
    try {
      const { slug } = req.params;
      let article = await Article.findOne({ where: { slug }, include: Tag });

      if (!article) { throw new Error('Article not found!'); }

      await article.removeFavourites(req.userId);

      const user = await User.findByPk(req.userId, { include: ['Favourites'] });
      const author = await User.findByPk(article.UserId, { include: ['Followers'] });

      article = formatOutputArticle(article, author, user);
      return res.status(200).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new FavouriteController();