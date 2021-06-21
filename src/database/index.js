const { Sequelize } = require('sequelize');

const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');
const User = require('../models/User');

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Creating tables
Article.init(sequelize);
Comment.init(sequelize);
Tag.init(sequelize);
User.init(sequelize);

// Creating relations
// Relation 1 to many between User and Article
User.hasMany(Article, { onDelete: 'CASCADE' });
Article.belongsTo(User);

// Relation 1 to many between Article and Comment
Article.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Article);

// Relation 1 to many between User and Comment
User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User);

// Relation many to many between User and User(Followers)
User.belongsToMany(User, { through: 'UserUser', as: 'Followers' });

// Relation many to many between User and Articles(Favourites)
Article.belongsToMany(User, { through: 'UserArticle', as: 'Favourites' });
User.belongsToMany(Article, { through: 'UserArticle', as: 'Favourites' });

// Relation many to many between Article and Tags(TagList)
Article.belongsToMany(Tag, { through: 'ArticleTag' });
Tag.belongsToMany(Article, { through: 'ArticleTag' });

module.exports = sequelize;
