const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const Users = require('./mstuser')
const { DataTypes } = Sequelize;
 
const Posting = db.define('mst_posting',{
    title:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

const AttachmentPosting = db.define('mst_posting_attachment',{
    file_name:{
        type: DataTypes.STRING
    },
    file_path:{
        type: DataTypes.TEXT
    },
    file_type:{
        type: DataTypes.STRING
    }
});
Posting.belongsTo(Users,{
    foreignKey: {
      name: 'created_by'
    }
  });
  
AttachmentPosting.belongsTo(Posting,{
    foreignKey: {
      name: 'posting_id'
    }
  });

(async () => {
    await db.sync();
})();
 
module.exports = {Posting,AttachmentPosting};