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

    await queryInterface.bulkInsert("State", [
      {
        user_id: "test1",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test2",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test3",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test4",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test5",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
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
