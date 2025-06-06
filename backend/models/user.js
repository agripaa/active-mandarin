'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.belongsTo(models.AffiliateDetail, { foreignKey: 'detail_affiliate' });
      User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'User' });
      User.hasMany(models.Transaction, { foreignKey: 'affiliator_id', as: 'Affiliator' });
      User.hasMany(models.JawabanUser, { foreignKey: 'user_id' });
    }

    // Fungsi untuk memvalidasi password saat login
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    affiliator_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reveral_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    detail_affiliate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    timestamps: true, // Aktifkan createdAt & updatedAt
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });

  return User;
};
