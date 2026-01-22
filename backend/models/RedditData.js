const mongoose = require("mongoose");

const RedditDataSchema = new mongoose.Schema(
  {
    // =========================
    // Primary IDs
    // =========================

    id: { type: String, unique: true, index: true },
    post_id: String,

    // =========================
    // Raw Reddit Content
    // =========================

    title: String,
    body: String,
    selftext: String,

    author: String,
    subreddit: String,

    score: Number,
    upvote_ratio: Number,
    num_comments: Number,

    created_utc: String,
    collected_at: String,

    url: String,
    permalink: String,

    is_self: Boolean,
    link_flair_text: String,

    parent_id: String,

    // =========================
    // Cleaning Output
    // =========================

    clean_text: String,

    word_count: Number,

    keywords: [String],

    // =========================
    // Sentiment Output (CRITICAL)
    // =========================

    sentiment_score: Number,

    sentiment_label: {
      type: String,
      enum: ["Positive", "Negative", "Neutral"],
    },

    vader_positive: Number,
    vader_negative: Number,
    vader_neutral: Number,

    sentiment_confidence: Number,

    transformer_label: String,
    transformer_score: Number,
    transformer_confidence: Number,

    // =========================
    // Metadata
    // =========================

    data_type: {
      type: String,
      enum: ["post", "comment"],
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RedditData", RedditDataSchema);
