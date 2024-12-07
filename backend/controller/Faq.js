const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getFaq = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {question : {[op.substring]: `${search}`}},
                    {answer : {[op.substring]: `${search}`}}
                ]
            }
        }
        const faq = await models.MstFaq.findAll({
            include: [{
                association: 'MstUser',
              }], 
            where:where_query
            }
        );
        res.json(faq);
    } catch (error) {
        console.log(error);
    }
}