const ingestionService = require("../services/dataIngestionService");

// Fetch Reddit Data
exports.ingestRedditData = async (req, res) => {
  try {
    const { subreddit, limit, commentLimit } = req.body;

    const count = await ingestionService.fetchAndStorePosts(
      subreddit,
      limit,
      commentLimit
    );

    res.json({
      success: true,
      inserted: count,
    });
  } catch (error) {
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
