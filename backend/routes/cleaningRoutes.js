const express = require("express");
const router = express.Router();

const controller = require("../controllers/cleaningController");

router.post("/clean", controller.cleanPosts);
router.post("/reclean", controller.recleanPosts);
router.get("/stats", controller.getCleaningStats);
router.delete("/empty", controller.removeEmptyPosts);

module.exports = router;
