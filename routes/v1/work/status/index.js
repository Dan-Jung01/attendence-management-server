import { Router } from "express";

const router = Router();

router.use("/", require("./status"));

router.use("/late", require("./late"));
router.use("/miss", require("./miss"));
router.use("/early", require("./early"));

module.exports = router;
