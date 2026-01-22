const topicService = require("../services/topicService");

exports.getTrendingTopics = async (req, res) => {
  try {

    const { top_n, subreddit } = req.query;

    const topics = await topicService.getTrendingTopics(
      Number(top_n) || 10,
      subreddit || null
    );

    res.json({
      success: true,
      topics
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getTrendingTitles = async (req, res) => {
  try {

    const { top_n, subreddit } = req.query;

    const posts = await topicService.getTrendingTitles(
      Number(top_n) || 3,
      subreddit || null
    );

    res.json({
      success: true,
      posts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
