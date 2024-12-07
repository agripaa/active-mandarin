const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const Role = require('./RoleModel')
const { DataTypes } = Sequelize;
 
const Users = db.define('MstUsers',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

Users.belongsTo(Role,{
    foreignKey: {
      name: 'role_id'
    }
  });

(async () => {
    await db.sync();
})();
 
module.exports = Users;