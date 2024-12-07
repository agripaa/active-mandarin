'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt();
const models = require('../models/index');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roleadmin = await models.MstRole.findAll({
      where:{
        role_name: "Administrator"
      }
    });
    let roleadminid = roleadmin[0].id
    return await queryInterface.bulkInsert('MstUser', [{
         role_id: roleadminid,
         name: "Administrator",
         email: "administrator@administrator.com",
         password: bcrypt.hashSync("admin1234", 10),
         createdAt: new Date(),
         updatedAt: new Date()
      }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
