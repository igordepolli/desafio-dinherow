const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bio: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
    });
  }
}

module.exports = User;