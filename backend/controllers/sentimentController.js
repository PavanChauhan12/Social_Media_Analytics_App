const sentimentService = require("../services/sentimentService");
const RedditData = require("../models/RedditData");

exports.analyzePosts = async (req, res) => {
  try {
    const count = await sentimentService.analyzeAllPosts();

    res.json({
      success: true,
      analyzed: count
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.reanalyzePosts = async (req, res) => {
  try {
    const count = await sentimentService.reanalyzeAllPosts();

    res.json({
      success: true,
      analyzed: count
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getSentimentStats = async (req, res) => {

  const { subreddit } = req.query;

  const filter = {};

  if (subreddit && subreddit !== "all") {
    filter.subreddit = subreddit;
  }

  try {

    const total_posts = await RedditData.countDocuments(filter);

    const analyzed_posts = await RedditData.countDocuments({
      ...filter,
      sentiment_score: { $exists: true }
    });

    const distribution = await RedditData.aggregate([
      { $match: { ...filter, sentiment_label: { $exists: true } } },
      {
        $group: {
          _id: "$sentiment_label",
          count: { $sum: 1 }
        }
      }
    ]);

    const sentiment_distribution = {};

    distribution.forEach(item => {
      sentiment_distribution[item._id] = item.count;
    });

    const avg = await RedditData.aggregate([
      { $match: { ...filter, sentiment_score: { $exists: true } } },
      {
        $group: {
          _id: null,
          avg: { $avg: "$sentiment_score" }
        }
      }
    ]);

    res.json({
      total_posts,
      analyzed_posts,
      sentiment_distribution,
      avg_sentiment_score: avg[0]?.avg || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSentimentTimeline = async (req, res) => {
  try {
    const { subreddit } = req.query;

    const matchFilter = {
      sentiment_score: { $exists: true },
      data_type: "post"
    };

    if (subreddit && subreddit !== "all") {
      matchFilter.subreddit = subreddit;
    }

    const data = await RedditData.aggregate([
      {
        $match: matchFilter
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $toDate: "$created_utc" }
            }
          },
          avgSentiment: { $avg: "$sentiment_score" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      success: true,
      timeline: data
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
