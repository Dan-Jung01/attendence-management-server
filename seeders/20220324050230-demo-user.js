"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Users", [
      {
        user_id: "test1",
        user_pwd: "$2b$10$ea/GPKUup1XSr.z/fXDMmOhcqNLDA8hE4p7ffSHoS6w5WdmbmOfd6",
        user_name: "Ryan1",
        phone: "010-0000-0000",
        start_date: new Date(),
        break_cnt: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "test2",
        user_pwd: "$2b$10$ea/GPKUup1XSr.z/fXDMmOhcqNLDA8hE4p7ffSHoS6w5WdmbmOfd6",
        user_name: "Ryan2",
        phone: "010-0000-0000",
        start_date: new Date(),
        break_cnt: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "test3",
        user_pwd: "$2b$10$ea/GPKUup1XSr.z/fXDMmOhcqNLDA8hE4p7ffSHoS6w5WdmbmOfd6",
        user_name: "Ryan3",
        phone: "010-0000-0000",
        start_date: new Date(),
        break_cnt: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "test4",
        user_pwd: "$2b$10$ea/GPKUup1XSr.z/fXDMmOhcqNLDA8hE4p7ffSHoS6w5WdmbmOfd6",
        user_name: "Ryan4",
        phone: "010-0000-0000",
        start_date: new Date(),
        break_cnt: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "test5",
        user_pwd: "$2b$10$ea/GPKUup1XSr.z/fXDMmOhcqNLDA8hE4p7ffSHoS6w5WdmbmOfd6",
        user_name: "Ryan5",
        phone: "010-0000-0000",
        start_date: new Date(),
        break_cnt: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  return queryInterface.bulkDelete('Users', null, {});
  },
};

// npx sequelize-cli db:seed:all
// npx sequelize-cli seed:generate --name demo-user
