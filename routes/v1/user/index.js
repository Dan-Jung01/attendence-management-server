import { Router } from "express";

const router = Router();

router.use("/", require("./put"));
router.use("/", require("./delete"));

router.use("/list", require("./list"));
router.use("/break-calc", require("./break-calc"));
router.use("/break-count", require("./break-count"));

module.exports = router;
