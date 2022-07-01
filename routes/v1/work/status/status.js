import { Router } from "express";
import { Worktime } from "../../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", async function (req, res) {
  const { user_id } = req.query;

  try {
    const stateLate = await Worktime.findAll({
      attributes: [Sequelize.literal(`sum(state_late) state_late`)],
      where: {
        user_id: { [Op.eq]: user_id },
        state_late: 1,
      },
      raw: true,
    });

    const stateEarlyCheck = await Worktime.findAll({
      attributes: [Sequelize.literal(`sum(state_early_check) state_early_check`)],
      where: {
        user_id: { [Op.eq]: user_id },
        state_early_check: 1,
      },
      raw: true,
    });

    const stateMissCheck = await Worktime.findAll({
      attributes: [Sequelize.literal(`sum(state_miss_check) state_miss_check`)],
      where: {
        user_id: { [Op.eq]: user_id },
        state_miss_check: 1,
      },
      raw: true,
    });

    Promise.all([stateLate, stateEarlyCheck, stateMissCheck]).then((values) => {
      res.json(values);
    });
  } catch (err) {
    console.log(err);
  }

  // Worktime.findAll({
  //   attributes: ["state_late", "state_early_check"],
  //   where: {
  //     user_id: { [Op.eq]: user_id },
  //     state_late: 1,
  //   },
  //   raw: true,
  // }).then((res) => console.log(res));
});

module.exports = router;
