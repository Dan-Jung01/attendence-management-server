import { Router } from "express";

const router = Router();

router.use("/", require("./get"));
router.use("/", require("./post"));
router.use("/", require("./put"));
router.use("/", require("./delete"));

module.exports = router;
