'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ujian extends Model {
        static associate(models){}
    }

    Ujian.init({
        nama_ujian: DataTypes.STRING,
        level: DataTypes.STRING,
        harga_normal: DataTypes.STRING,
        harga_diskon: DataTypes.STRING,
        harga_certif: DataTypes.STRING,
        ujian_img: DataTypes.STRING,
        sold_sum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
        },
        commission: DataTypes.STRING,
        total_skor: {
        type: DataTypes.INTEGER,
        defaultValue: 0
        },
        desc: DataTypes.TEXT,
        isProgres: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
        isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
        isCheck: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'ujian',
        modelName: 'Ujian',
        freezeTableName: true,
        timestamps: true,
    });

    return Ujian;
};
