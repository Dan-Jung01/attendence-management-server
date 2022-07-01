import { Router } from "express";
import { Break } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", async function (req, res) {
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
