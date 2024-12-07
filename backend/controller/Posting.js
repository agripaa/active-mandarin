const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getPosting = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {type : {[op.substring]: `${search}`}},
                    {title : {[op.substring]: `${search}`}},
                    {content : {[op.substring]: `${search}`}}
                ]
            }
        }
        const posting = await models.MstPosting.findAll({
            include: [{
                association: 'MstUser',
              },{
                association: 'MstPostingAttachment',
              }], 
            where:where_query
            }
        );
        res.json(posting);
    } catch (error) {
        console.log(error);
    }
}