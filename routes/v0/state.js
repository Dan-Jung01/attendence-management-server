var express = require("express");
var router = express.Router();
const { State } = require("../../models");
const { Sequelize } = require("sequelize");

// Post on_work Time into DB
router.post("/status-init", function (req, res) {
  const { user_id } = req.body;

  State.create({
    user_id: user_id,
    state_late: 0,
    state_absence: 0,
    state_miss_check: 0,
    state_early_check: 0,
  });
});

router.get("/all-status", function (req, res) {
  const { user_id } = req.query;
  State.findAll({
    where: {
      user_id: user_id,
    },
  }).then((data) => {
    // const userData = data.map((mData) => {
    //   mData;
    // });
    console.log(data);
    res.json(data[0]);
  });
});

// router.put("/late-status", function (req, res) {
//   const { user_id } = req.body;

//   State.update(
//     {
//       state_late: Sequelize.literal("state_late + 1"),
//     },
//     {
//       where: {
//         user_id: user_id,
//       },
//     }
//   );
// });

// router.put("/early-status", function (req, res) {
//   const { user_id } = req.body;

//   State.update(
//     {
//       state_early_check: Sequelize.literal("state_early_check + 1"),
//     },
//     {
//       where: {
//         user_id: user_id,
//       },
//     }
//   );
// });

// router.put("/arly-status", function (req, res) {
//   const { user_id } = req.body;

//   State.update(
//     {
//       state_early_check: Sequelize.literal("state_early_check + 1"),
//     },
//     {
//       where: {
//         user_id: user_id,
//       },
//     }
//   );
// });

module.exports = router;
