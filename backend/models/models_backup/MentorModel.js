const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const { DataTypes } = Sequelize;
 
const Mentor = db.define('mst_mentor',{
    name:{
        type: DataTypes.STRING
    },
    university_name:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();
 
module.exports = Mentor;