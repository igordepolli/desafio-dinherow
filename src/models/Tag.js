const { DataTypes, Model } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
    });
  }
}

module.exports = Tag;