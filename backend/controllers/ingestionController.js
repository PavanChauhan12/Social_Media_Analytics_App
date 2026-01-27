const ingestionService = require("../services/dataIngestionService");

// Fetch Reddit Data
exports.ingestRedditData = async (req, res) => {
  try {
    const { subreddit, limit=50, commentLimit = 20 } = req.body;

    if (!subreddit || subreddit.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Subreddit name is required"
      });
    }

    const count = await ingestionService.fetchAndStorePosts(
      subreddit,
      Number(limit),
      Number(commentLimit)
    );

    res.json({
      success: true,
      subreddit,
      inserted: count,
      message: `Successfully ingested r/${subreddit}`
    });
  } catch (error) {
    console.error("Ingestion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Read APIs
exports.getPosts = async (req, res) => {
  const posts = await ingestionService.getAllPosts();
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await ingestionService.getPostById(req.params.id);
  res.json(post);
};

exports.getStats = async (req, res) => {
  const stats = await ingestionService.getStats();
  res.json(stats);
};
