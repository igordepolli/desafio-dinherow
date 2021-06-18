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

      if (await Article.findOne({ where: { slug } })) { throw new Error('This title already exists, please, choose another'); }

      const article = await Article.create({
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

          article.addTags(tag);
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