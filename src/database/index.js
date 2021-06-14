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

module.exports = sequelize;
