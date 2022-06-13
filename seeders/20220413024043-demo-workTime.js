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

    await queryInterface.bulkInsert("Worktime", [
      {
        user_id: "test1",
        today_date: "2021-11-13",
        user_name: "Ryan1",
        on_work: "07:30:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test2",
        today_date: "2021-11-14",
        user_name: "Ryan2",
        on_work: "08:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test3",
        today_date: "2021-11-15",
        user_name: "Ryan3",
        on_work: "09:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test1",
        today_date: "2021-11-16",
        user_name: "Ryan1",
        on_work: "10:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test1",
        today_date: "2021-11-17",
        user_name: "Ryan1",
        on_work: "11:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test1",
        today_date: "2021-11-17",
        user_name: "Ryan1",
        on_work: "14:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test1",
        today_date: "2021-11-18",
        user_name: "Ryan1",
        on_work: "01:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test2",
        today_date: "2021-11-12",
        user_name: "Ryan2",
        on_work: "04:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test3",
        today_date: "2021-11-12",
        user_name: "Ryan3",
        on_work: "08:00:00",
        off_work: "00:00:00",
        state_late: 0,
        state_absence: 0,
        state_miss_check: 0,
        state_early_check: 0,
      },
      {
        user_id: "test4",
        today_date: "2021-11-11",
        user_name: "Ryan4",
        on_work: "13:00:00",
        off_work: "00:00:00",
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
  },
};

// npx sequelize-cli db:seed:all
// npx sequelize-cli seed:generate --name demo-user
