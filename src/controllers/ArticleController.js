const slugify = require('slugify');
const Article = require('../models/Article');
const Tag = require('../models/Tag');

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

      const article = await Article.create({
        slug,
        title,
        description,
        body,
        UserId: req.userId
      });

      if (tagList) {
        // eslint-disable-next-line no-restricted-syntax
        for (const tag of tagList) {
          // eslint-disable-next-line no-await-in-loop
          const existingTag = await Tag.findOne({ where: { name: tag } });
          if (!existingTag) {
            // eslint-disable-next-line no-await-in-loop
            const newTag = await Tag.create({ name: tag });
            article.addTag(newTag);
          } else {
            article.addTag(existingTag);
          }
        }
      }

      const createdArticle = await Article.findByPk(article.id, { include: Tag });
      return res.status(201).json({ createdArticle });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController();