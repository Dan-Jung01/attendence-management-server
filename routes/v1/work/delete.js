import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.delete("/:id", async function (req, res) {
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

module.exports = router;
