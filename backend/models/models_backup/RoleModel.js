const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const { DataTypes } = Sequelize;
 
const Role = db.define('MstRole',{
    role_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();
 
module.exports = Role;