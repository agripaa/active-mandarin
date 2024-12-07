const {
    Sequelize
  } = require('sequelize');
const db = require('../../config/Database.js');
const { DataTypes } = Sequelize;
 
const GroupClass = db.define('MstGroupClass',{
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.Text
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();
 
module.exports = GroupClass;