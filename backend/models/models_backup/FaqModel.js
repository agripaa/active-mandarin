const {
    Sequelize
  } = require('sequelize');
const db = require('../config/Database.js');
const Users = require('./mstuser')
const { DataTypes } = Sequelize;
 
const Faq = db.define('mst_faq',{
    question:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

const AttachmentFaq = db.define('mst_faq_answer',{
    answer:{
        type: DataTypes.TEXT
    }
});
Faq.belongsTo(Users,{
    foreignKey: {
      name: 'created_by'
    }
  });
  
AttachmentFaq.belongsTo(Faq,{
    foreignKey: {
      name: 'faq_id'
    }
  });

(async () => {
    await db.sync();
})();
 
module.exports = {Faq,AttachmentFaq};