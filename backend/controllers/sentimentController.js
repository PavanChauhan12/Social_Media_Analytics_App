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

exports.getStats = async (req, res) => {
  const stats = await sentimentService.getSentimentStats();
  res.json(stats);
};

exports.getSentimentTimeline = async (req, res) => {
  try {

    const data = await RedditData.aggregate([
      {
        $match: {
          sentiment_score: { $exists: true },
          data_type: "post"
        }
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
