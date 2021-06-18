const slugify = require('slugify');
const Article = require('../models/Article');
const Tag = require('../models/Tag');

function cleanArticle(article, user, count) {
  const tagList = [];
  for (let t of article.dataValues.Tags) {
    tagList.push(t.name);
  }
  delete article.dataValues.Tags;
  article.dataValues.tagList = tagList;
}

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
        const promises = tagList.map((tag) => Tag.findOrCreate({ where: { name: tag } }));
        const modelTags = await Promise.all(promises);
        const promises2 = modelTags.map((tag) => article.addTags(tag[0]));
        await Promise.all(promises2);
      }

      const createdArticle = await Article.findByPk(article.id, { include: Tag });
      return res.status(201).json({ createdArticle });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController();