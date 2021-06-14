const { DataTypes, Model } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    super.init({
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

module.exports = Comment;