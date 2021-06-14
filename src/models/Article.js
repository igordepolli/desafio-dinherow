const { DataTypes, Model } = require('sequelize');

class Article extends Model {
  static init(sequelize) {
    super.init({
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
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