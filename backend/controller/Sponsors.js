const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getSponsors = async(req, res) => {
    const {search} = req.query;
    try {
        let where_query = {}
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {name : {[op.substring]: `${search}`}},
                    {description : {[op.substring]: `${search}`}}
                ]
            }
        }
        const sponsors = await models.MstSponsors.findAll({
            include: [{
                association: 'MstUser',
              },{
                association: 'MstSponsorsAttachment',
              }], 
            where:where_query
            }
        );
        res.json(sponsors);
    } catch (error) {
        console.log(error);
    }
}