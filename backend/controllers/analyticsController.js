const RedditData = require("../models/RedditData");

// ================================
// DASHBOARD KPI CONTROLLER
// ================================

exports.getDashboardStats = async (req, res) => {
  try {

    const subreddit = req.query.subreddit;

    const matchStage = subreddit
      ? { data_type: "post", subreddit }
      : { data_type: "post" };

    // --------------------------
    // TOTAL POSTS
    // --------------------------

    const totalPosts = await RedditData.countDocuments(matchStage);

    // --------------------------
    // SENTIMENT DISTRIBUTION
    // --------------------------

    const sentimentData = await RedditData.aggregate([
      { $match: { ...matchStage, sentiment_label: { $exists: true } } },
      {
        $group: {
          _id: "$sentiment_label",
          count: { $sum: 1 }
        }
      }
    ]);

    let positive = 0;
    let negative = 0;
    let neutral = 0;

    sentimentData.forEach(item => {
      if (item._id === "Positive") positive = item.count;
      if (item._id === "Negative") negative = item.count;
      if (item._id === "Neutral") neutral = item.count;
    });

    const analyzedTotal = positive + negative + neutral;

    const positivePercent = analyzedTotal
      ? ((positive / analyzedTotal) * 100).toFixed(1)
      : 0;

    const negativePercent = analyzedTotal
      ? ((negative / analyzedTotal) * 100).toFixed(1)
      : 0;

    // --------------------------
    // AVERAGE SENTIMENT SCORE
    // --------------------------

    const avgResult = await RedditData.aggregate([
      { $match: { ...matchStage, sentiment_score: { $exists: true } } },
      {
        $group: {
          _id: null,
          avgSentiment: { $avg: "$sentiment_score" }
        }
      }
    ]);

    const avgSentiment = avgResult.length
      ? avgResult[0].avgSentiment.toFixed(3)
      : 0;

    // --------------------------
    // RESPONSE
    // --------------------------

    res.json({
      total_posts: totalPosts,
      positive_percent: positivePercent,
      negative_percent: negativePercent,
      avg_sentiment: avgSentiment
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
};
