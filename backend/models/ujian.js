'use strict'

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ujian extends Model {
        static associate(models) {
            Ujian.hasMany(models.UjianBrand, { foreignKey: 'ujian_id' });
            Ujian.hasMany(models.TipeUjian, { foreignKey: 'ujian_id' });
        }
    }

    Ujian.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nama_ujian: DataTypes.STRING(255),
        level: DataTypes.STRING(255),
        harga_normal: DataTypes.STRING,
        harga_diskon: DataTypes.STRING,
        harga_certif: DataTypes.STRING,
        ujian_img: DataTypes.STRING(225),
        sold_sum: {type: DataTypes.INTEGER, defaultValue: 0},
        commission: DataTypes.STRING,
        total_skor: DataTypes.INTEGER,
        desc: DataTypes.TEXT,
        isProgres: {type: DataTypes.BOOLEAN, defaultValue: false},
        isDone: {type: DataTypes.BOOLEAN, defaultValue: false},
        isCheck: {type: DataTypes.BOOLEAN, defaultValue: false},
    }, {
        sequelize,
        modelName: 'Ujian',
        tableName: 'ujian',
        timestamps: true
    });

    return Ujian;
}
