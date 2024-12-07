const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const Users = require('./mstuser')
const { DataTypes } = Sequelize;
 
const Sponsors = db.define('MstSponsors',{
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

const AttachmentSponsors = db.define('MstSponsors_attachment',{
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
Sponsors.belongsTo(Users,{
    foreignKey: {
      name: 'created_by'
    }
  });
  
AttachmentSponsors.belongsTo(Sponsors,{
    foreignKey: {
      name: 'company_id'
    }
  });

(async () => {
    await db.sync();
})();
 
module.exports = {Sponsors,AttachmentSponsors};