const slugify = require('slugify');
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

function formatOutput(article, author, count, favorited, userId) {
  const tagList = [];
  for (const t of article.dataValues.Tags) {
    tagList.push(t.name);
  }

  delete article.dataValues.id;
  delete article.dataValues.Tags;
  delete article.dataValues.UserId;
  article.dataValues.tagList = tagList;

  article.dataValues.favorited = favorited;
  article.dataValues.favoritesCount = count;

  let following = false;
  for (const follower of author.Followers) {
    if (follower.dataValues.id === userId) {
      following = true;
    }
  }

  delete author.dataValues.id;
  delete author.dataValues.email;
  delete author.dataValues.password;
  delete author.dataValues.createdAt;
  delete author.dataValues.updatedAt;
  delete author.dataValues.Followers;
  author.dataValues.following = following;
  article.dataValues.author = author;

  return article;
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
      const countFavorites = await articleCreate.countUsers();
      const favorite = false;

      const articleCreated = await Article.findByPk(articleCreate.id, { include: Tag });
      const article = formatOutput(articleCreated, author, countFavorites, favorite, req.userId);
      return res.status(201).json({ article });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController();