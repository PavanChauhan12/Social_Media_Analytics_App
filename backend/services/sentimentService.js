const RedditData = require("../models/RedditData");
const { analyzeSentiment } = require("../utils/sentimentUtils");

// =======================
// Analyze Single Post
// =======================

const analyzeSinglePost = (post) => {

  let text = post.clean_text || "";

  if (!text) {
    const title = post.title || "";
    const body = post.body || post.selftext || "";
    text = `${title} ${body}`;
  }

  if (!text.trim()) {
    return {
      sentiment_score: 0,
      sentiment_label: "Neutral"
    };
  }

  return analyzeSentiment(text);
};

// =======================
// Analyze All Posts
// =======================

exports.analyzeAllPosts = async () => {

  const query = {
    data_type: "post",
    sentiment_score: { $exists: false }
  };

  const posts = await RedditData.find(query);

  let analyzedCount = 0;

  for (const post of posts) {

    const sentimentData = analyzeSinglePost(post);

    await RedditData.updateOne(
      { _id: post._id },
      { $set: sentimentData }
    );

    analyzedCount++;
  }

  return analyzedCount;
};

// =======================
// Reanalyze All Posts
// =======================

exports.reanalyzeAllPosts = async () => {

  const posts = await RedditData.find({ data_type: "post" });

  let analyzedCount = 0;

  for (const post of posts) {

    const sentimentData = analyzeSinglePost(post);

    await RedditData.updateOne(
      { _id: post._id },
      { $set: sentimentData }
    );

    analyzedCount++;
  }

  return analyzedCount;
};

// =======================
// Stats
// =======================

exports.getSentimentStats = async () => {

  const totalPosts = await RedditData.countDocuments({ data_type: "post" });
  const analyzedPosts = await RedditData.countDocuments({
    sentiment_score: { $exists: true }
  });

  const distribution = await RedditData.aggregate([
    { $match: { sentiment_label: { $exists: true } } },
    {
      $group: {
        _id: "$sentiment_label",
        count: { $sum: 1 }
      }
    }
  ]);

  const avgStats = await RedditData.aggregate([
    { $match: { sentiment_score: { $exists: true } } },
    {
      $group: {
        _id: null,
        avg: { $avg: "$sentiment_score" },
        max: { $max: "$sentiment_score" },
        min: { $min: "$sentiment_score" }
      }
    }
  ]);

  const sentimentDistribution = {};
  distribution.forEach(item => {
    sentimentDistribution[item._id] = item.count;
  });

  return {
    total_posts: totalPosts,
    analyzed_posts: analyzedPosts,
    sentiment_distribution: sentimentDistribution,

    avg_sentiment_score: avgStats[0]?.avg?.toFixed(3) || 0,
    max_sentiment_score: avgStats[0]?.max || 0,
    min_sentiment_score: avgStats[0]?.min || 0
  };
};
