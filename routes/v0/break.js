var express = require("express");
var router = express.Router();
const { Break } = require("../../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

/* Post Leave period and reason */
router.post("/break", function (req, res) {
  const { start_date, end_date, today_date, used_date_cnt, user_name, user_id, reason } = req.body;

  Break.create({
    start_date: start_date,
    end_date: end_date,
    today_date: today_date,
    used_date_cnt: used_date_cnt,
    user_name: user_name,
    user_id: user_id,
    reason: reason,
    status: "DEFER",
  }).then((r) => res.json(r));
});

router.get("/break", function (req, res) {
  Break.findAll({ order: [[Sequelize.col("id"), "DESC"]] })
    .then((data) => {
      const userData = data.map((mData) => mData);

      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/break/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const deleteUser = await Break.destroy({
      where: {
        id: { [Op.eq]: id },
      },
    });

    res.json(deleteUser);
  } catch (err) {
    console.log(err);
  }
});

router.put("/break/approval", async function (req, res) {
  const { status, id } = req.body;

  try {
    await Break.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((r) => res.json(r));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
