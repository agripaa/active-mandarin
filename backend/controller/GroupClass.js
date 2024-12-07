const models = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getGroupClass = async(req, res) => {
    let {search,limit,page} = req.query;
    let groupclassid;
    try {
        let where_query = {}
        let where_query_course = {}
        let offset = 0;
        if ( typeof search !== 'undefined' && search ){
            
            where_query = {
                [op.or]: [
                    {name : {[op.substring]: `${search}`}},
                    {description : {[op.substring]: `${search}`}}
                ]
            }
            const groupclass = await models.MstGroupClass.findAll({
                where:where_query,
                }
            );
            groupclassid = groupclass[0].id
            where_query_course = {group_class_id:groupclassid}
        }
        if ( !limit ){
            limit = null
        }else{
            limit = parseInt(limit)
        }
        if ( typeof page !== 'undefined' && page ){
            offset = ((parseInt(page)-1)*limit)
        }
        const courses = await models.MstCourses.findAll({
            where:where_query_course,
            limit:limit,
            offset:offset,
            order: [
                ['group_class_id', 'ASC'],
            ],
            include: [{
                model: models.MstGroupClass,
                as: 'MstGroupClass',
              }], 
            }

        );
        res.json(courses);
    } catch (error) {
        console.log(error);
    }
}