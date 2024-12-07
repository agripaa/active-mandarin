const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getAbout = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {year : {[op.substring]: `${search}`}}
                ]
            }
        }
        const mstabout = await models.MstAbout.findAll({
            include: [{
                association: 'MstUser',
              }], 
            where:where_query
            }
        );
        res.json(mstabout);
    } catch (error) {
        console.log(error);
    }
}