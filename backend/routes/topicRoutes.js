const express = require("express");
const router = express.Router();

const controller = require("../controllers/topicController");

router.get("/trending-topics", controller.getTrendingTopics);
router.get("/trending-titles", controller.getTrendingTitles);

module.exports = router;
