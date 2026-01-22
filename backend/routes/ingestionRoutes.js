const express = require("express");
const router = express.Router();

const controller = require("../controllers/ingestionController");

// Ingestion
router.post("/ingest", controller.ingestRedditData);

// Read
router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);

// Stats
router.get("/stats", controller.getStats);

module.exports = router;
