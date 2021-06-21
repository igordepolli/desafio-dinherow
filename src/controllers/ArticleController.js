const slugify = require('slugify');

const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

const { formatOutputArticle } = require('../utils/FormatOutputs');

class ArticleController {
  async store(req, res) {
    try {
      const {
        title, description, body, tagList
      } = req.body.article;

      if (!title) { throw new Error('Title is required!'); }
      if (!description) { throw new Error('Description is required'); }
      if (!body) { throw new Error('Body is required'); }

      const slug = slugify(title);

      if (await Article.findOne({ where: { slug } })) { throw new Error('This title already exists, please, choose another'); }

      const articleCreate = await Article.create({
        slug,
        title,
        description,
        body,
        UserId: req.userId
      });

      if (tagList) {
        for (const t of tagList) {
          const [tag, ] = await Tag.findOrCreate({
            where: { name: t }
          });

          const promises = await articleCreate.addTags(tag);
          Promise.all(promises);
        }
      }

      const author = await User.findByPk(req.userId, { include: ['Followers'] });
      const articleCreated = await Article.findByPk(articleCreate.id, { include: Tag });

      const article = formatOutputArticle(articleCreated, author, null);
      return res.status(201).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      const { slug } = req.params;
      const articleFind = await Article.findOne({ where: { slug }, include: Tag });

      const { UserId } = articleFind;

      const author = await User.findByPk(UserId, { include: ['Followers'] });

      let user = null;
      if (req.userId) {
        user = await User.findByPk(req.userId, { include: ['Favourites'] });
      }

      const article = formatOutputArticle(articleFind, author, user);
      return res.status(200).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController();