import { Router } from "express";

const router = Router();

router.use("/start", require("./start"));
router.use("/end", require("./end"));
router.use("/", require("./edit"));
router.use("/", require("./delete"));

router.use("/start-record", require("./start-record"));
router.use("/current-worker", require("./current-worker"));
router.use("/record", require("./record"));
router.use("/admin-record", require("../../v0/admin-record"));

router.use("/check-early", require("./check-early"));
router.use("/check-late", require("./check-late"));
router.use("/check-miss", require("./check-miss"));

router.use("/status", require("./status"));

module.exports = router;
