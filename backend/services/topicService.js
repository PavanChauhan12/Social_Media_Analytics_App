const RedditData = require("../models/RedditData");
const natural = require("natural");

const TfIdf = natural.TfIdf;

// =========================
// Get Trending Topics
// =========================

exports.getTrendingTopics = async (topN = 10, subreddit = null) => {

  const query = {
    data_type: "post",
    clean_text: { $exists: true, $ne: "" },
    score: { $gt: 10 }
  };

  if (subreddit) query.subreddit = subreddit;

  const posts = await RedditData.find(query)
    .sort({ created_utc: -1 })
    .limit(1000)
    .select("clean_text");

  if (!posts.length) return [];

  const tfidf = new TfIdf();

  posts.forEach(p => {
    tfidf.addDocument(p.clean_text);
  });

  const termScores = {};

  tfidf.documents.forEach((doc, i) => {
    Object.keys(doc).forEach(term => {
      const score = tfidf.tfidf(term, i);
      termScores[term] = (termScores[term] || 0) + score;
    });
  });

  const sortedTopics = Object.entries(termScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([topic, score]) => ({
      topic,
      score: Number(score.toFixed(4))
    }));

  return sortedTopics;
};

// =========================
// Get Trending Titles
// =========================

exports.getTrendingTitles = async (topN = 3, subreddit = null) => {

  const query = {
    data_type: "post",
    clean_text: { $exists: true, $ne: "" }
  };

  if (subreddit) query.subreddit = subreddit;

  const posts = await RedditData.find(query)
    .sort({ score: -1, created_utc: -1 })
    .limit(topN)
    .select("title score num_comments created_utc subreddit permalink");

  return posts;
};
