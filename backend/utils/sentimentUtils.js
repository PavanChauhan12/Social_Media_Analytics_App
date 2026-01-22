const vader = require("vader-sentiment");

// ========================
// Label mapping
// ========================

const getSentimentLabel = (compound, threshold = 0.18) => {
  if (compound >= threshold) return "Positive";
  if (compound <= -threshold) return "Negative";
  return "Neutral";
};

// ========================
// Analyze Sentiment
// ========================

exports.analyzeSentiment = (text) => {

  if (!text || typeof text !== "string") {
    return {
      sentiment_score: 0,
      sentiment_label: "Neutral",
      positive_score: 0,
      negative_score: 0,
      neutral_score: 1,
      confidence: 0
    };
  }

  const scores = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  const compound = scores.compound;

  const label = getSentimentLabel(compound);

  // Confidence approximation
  const confidence = Math.max(scores.pos, scores.neg);

  return {
    sentiment_score: compound,
    sentiment_label: label,

    positive_score: scores.pos,
    negative_score: scores.neg,
    neutral_score: scores.neu,

    confidence
  };
};
