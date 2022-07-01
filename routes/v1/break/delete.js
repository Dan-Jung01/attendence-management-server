import { Router } from "express";
import { Break } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.delete("/:id", async function (req, res) {
  const { id } = req.params;

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

module.exports = router;
