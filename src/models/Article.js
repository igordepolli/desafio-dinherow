const { DataTypes, Model } = require('sequelize');

class Article extends Model {
  static init(sequelize) {
    super.init({
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
    });
  }
}

module.exports = Article;