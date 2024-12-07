const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getMstMentor = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {name : {[op.substring]: `${search}`}},
                    {university_name : {[op.substring]: `${search}`}}
                ]
            }
        }
        const faq = await models.MstMentor.findAll({
            include: [{
                association: 'MstMentorAttachment',
              }], 
            where:where_query
            }
        );
        res.json(faq);
    } catch (error) {
        console.log(error);
    }
}