const { DataTypes, Model } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
    });
  }
}

module.exports = Tag;