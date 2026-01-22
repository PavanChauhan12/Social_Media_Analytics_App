const express = require("express");
const router = express.Router();

const controller = require("../controllers/sentimentController");

router.post("/analyze", controller.analyzePosts);
router.post("/reanalyze", controller.reanalyzePosts);
router.get("/stats", controller.getStats);
router.get("/timeline", controller.getSentimentTimeline);

module.exports = router;
