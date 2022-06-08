var express = require("express");
var router = express.Router();
const { Worktime, sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
import moment from "moment";

// Post on_work Time into DB
router.post("/work", function (req, res) {
  const { on_work, today_date, user_name, user_id } = req.body;

  // const findDupl = Worktime.findOne({
  //   where: {
  //     [Op.or]: [{ user_name: user_name }, { today_date: today_date }],
  //   },
  // });

  // if (findDupl === null) {
  //   // 시간 생성
  // } else {
  //   // 에러 처리
  // }

  Worktime.create({
    on_work: on_work,
    today_date: today_date,
    user_name: user_name,
    off_work: "00:00:00",
    user_id: user_id,
  }).then(() => {
    Worktime.findOne(
      {
        attributes: ["on_work"],
      },
      {
        where: {
          user_name: user_name,
          today_date: today_date,
        },
      }
    ).then((ress) => res.json(ress));
  });
});

//Put off_work Time into DB
router.put("/work", function (req, res, next) {
  const { off_work, today_date, user_name } = req.body;

  Worktime.update(
    {
      off_work: off_work,
    },
    {
      where: {
        user_name: user_name,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

router.put("/both-work-time", function (req, res) {
  const { off_work, on_work, today_date, user_id } = req.body;

  Worktime.update(
    {
      on_work: on_work,
      off_work: off_work,
    },
    {
      where: {
        user_id: user_id,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

// Get workTime Table Data from DB
router.get("/work-time", function (req, res, next) {
  Worktime.findAll({
    order: sequelize.col("id"),
    attributes: ["id", "user_id", "on_work", "off_work", "today_date", "user_name"],
  })
    .then((data) => {
      const workData = data.map((mData) => mData).reverse();
      res.json(workData);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/work-time/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const deleteUser = await Worktime.destroy({
      where: {
        id: { [Op.eq]: id },
      },
    });

    res.json(deleteUser);
  } catch (err) {
    console.log(err);
  }
});

// Get workTime Table Data from DB
router.get("/on-work-time", async function (req, res, next) {
  const { user_name, today_date } = req.query;

  try {
    const findWorkTime = await Worktime.findOne({
      where: {
        user_name: { [Op.eq]: user_name },
        today_date: { [Op.eq]: today_date },
      },
    });
    // console.log(findWorkTime.dataValues);
    res.json(findWorkTime.dataValues);
  } catch (err) {
    console.log(err);
  }
});

// Get workTime Table Data from DB
router.get("/user-work-status", function (req, res, next) {
  const { today_date } = req.query;

  Worktime.findAll({
    attributes: ["user_name", "on_work", "off_work"],
    where: {
      today_date: { [Op.eq]: today_date },
      off_work: { [Op.eq]: "00:00:00" },
    },
  })
    .then((data) => {
      const workData = data.map((mData) => mData).reverse();
      // console.log(workData);
      res.json(workData);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get workTime Table Data from DB
router.get("/user-work-record", function (req, res, next) {
  const { user_id } = req.query;

  Worktime.findAll({
    attributes: ["today_date", "on_work", "off_work"],
    where: {
      user_id: { [Op.eq]: user_id },
    },
  })
    .then((data) => {
      const workData = data.map((mData) => mData).reverse();
      // console.log(workData);
      res.json(workData);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/check-late", function (req, res) {
  const { user_id, today_date } = req.body;

  Worktime.update(
    {
      state_late: 1,
    },
    {
      where: {
        user_id: user_id,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

router.put("/check-early", function (req, res) {
  const { user_id, today_date } = req.body;

  Worktime.update(
    {
      state_early_check: 1,
    },
    {
      where: {
        user_id: user_id,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

// router.put("/check-absence", function (req, res) {
//   const { user_id, today_date } = req.body;

//   let dayOfWeek = today_date.getDay();
//   let isWeekend = dayOfWeek === 6 || dayOfWeek === 0; // 6 = Saturday, 0 = Sunday

//   const yesterdayData = Worktime.findOne({
//     attributes: ["today_date"],
//     where: {},
//   });

//   Worktime.update(
//     {
//       state_absence: 1,
//     },
//     {
//       where: {
//         user_id: user_id,
//         today_date: today_date,
//       },
//     }
//   ).then((r) => res.json(r));
// });

router.get("/late-count", function (req, res) {
  const { user_id } = req.query;

  Worktime.findAll({
    attributes: ["state_late"],
    where: {
      user_id: { [Op.eq]: user_id },
      state_late: 1,
    },
    raw: true,
  }).then((r) => res.json(r.length));
});

module.exports = router;
