const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getLang = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {indonesia : {[op.substring]: `${search}`}},
                    {english : {[op.substring]: `${search}`}},
                    {code : {[op.substring]: `${search}`}}
                ]
            }
        }
        const mstlanguage = await models.MstLanguage.findAll({
            include: [{
                association: 'MstUser',
              }], 
            where:where_query
            }
        );
        res.json(mstlanguage);
    } catch (error) {
        console.log(error);
    }
}