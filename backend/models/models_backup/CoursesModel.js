const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const Users = require('./mstuser')
const GroupClass = require('./GroupClassModel')
const { DataTypes } = Sequelize;
 
const Courses = db.define('MstCourses',{
    title:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.TEXT
    },
    level:{
        type: DataTypes.STRING
    },
    link:{
        type: DataTypes.TEXT
    },
    price:{
        type: DataTypes.FLOAT
    },
    rating:{
        type: DataTypes.FLOAT
    },
    student:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true
});

Courses.belongsTo(Users,{
    foreignKey: {
      name: 'created_by'
    }
  });

Courses.belongsTo(GroupClass,{
    foreignKey: {
      name: 'group_class_id'
    }
  });

(async () => {
    await db.sync();
})();
 
module.exports = Courses;