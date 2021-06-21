const Article = require('../models/Article');
const User = require('../models/User');
const Comment = require('../models/Comment');

const { formatOutputProfile } = require('../utils/FormatOutputs');

class CommentController {
  async store(req, res) {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ where: { slug } });
      if (!article) { throw new Error('Article not found!'); }

      const { body } = req.body.comment;
      if (!body) { throw new Error('Body comment is required!'); }

      const user = await User.findByPk(req.userId);

      const comment = await Comment.create({ body, ArticleId: article.id, UserId: user.id });

      comment.dataValues.author = formatOutputProfile(user, null);
      delete comment.dataValues.ArticleId;
      delete comment.dataValues.UserId;

      return res.status(201).json({ comment });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CommentController();