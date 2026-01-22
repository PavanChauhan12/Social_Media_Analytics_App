const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const ingestionRoutes = require("./routes/ingestionRoutes");
const cleaningRoutes = require("./routes/cleaningRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const topicRoutes = require("./routes/topicRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/reddit", ingestionRoutes);
app.use("/api/cleaning", cleaningRoutes);
app.use("/api/sentiment", sentimentRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/dashboard", analyticsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Social Media Analytics API Running...");
});

module.exports = app;
