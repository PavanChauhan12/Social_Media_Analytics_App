const axios = require("axios");
const RedditData = require("../models/RedditData");

// =======================
// Helpers
// =======================

const submissionToObject = (post) => ({
  id: post.id,
  title: post.title,
  body: post.selftext,
  selftext: post.selftext,

  author: post.author || "[deleted]",
  subreddit: post.subreddit,

  score: post.score,
  upvote_ratio: post.upvote_ratio,
  num_comments: post.num_comments,

  created_utc: new Date(post.created_utc * 1000).toISOString(),
  collected_at: new Date().toISOString(),

  url: post.url,
  permalink: `https://reddit.com${post.permalink}`,

  is_self: post.is_self,
  link_flair_text: post.link_flair_text,

  data_type: "post",
});

const commentToObject = (comment, postId, subreddit) => ({
  id: comment.id,
  post_id: postId,

  subreddit,
  body: comment.body,

  author: comment.author || "[deleted]",
  score: comment.score,

  created_utc: new Date(comment.created_utc * 1000).toISOString(),
  collected_at: new Date().toISOString(),

  parent_id: comment.parent_id,
  permalink: `https://reddit.com${comment.permalink}`,

  data_type: "comment",
});

// =======================
// INGESTION PIPELINE
// =======================

exports.fetchAndStorePosts = async (
  subredditName,
  limit = 20,
  commentLimit = 5
) => {
  let insertedCount = 0;

  // ---------- Fetch Posts ----------
  const postUrl = `https://www.reddit.com/r/${subredditName}/new.json?limit=${limit}`;

  const postResponse = await axios.get(postUrl, {
    headers: { "User-Agent": "SocialMediaAnalyticsBot/1.0" },
  });

  const posts = postResponse.data.data.children;

  for (const item of posts) {
    const post = item.data;

    const documents = [];

    // ---------- Add Post ----------
    const postObj = submissionToObject(post);
    documents.push(postObj);

    // ---------- Fetch Comments ----------
    if (commentLimit > 0) {
      try {
        const commentUrl = `https://www.reddit.com/comments/${post.id}.json`;

        const commentResponse = await axios.get(commentUrl, {
          headers: { "User-Agent": "SocialMediaAnalyticsBot/1.0" },
        });

        const commentData =
          commentResponse.data[1].data.children.slice(0, commentLimit);

        commentData.forEach((item) => {
          if (item.kind === "t1") {
            documents.push(
              commentToObject(item.data, post.id, post.subreddit)
            );
          }
        });
      } catch (err) {
        console.warn(`⚠ Failed to fetch comments for post ${post.id}`);
      }
    }

    // ---------- Bulk Insert ----------
    try {
      await RedditData.insertMany(documents, { ordered: false });
      insertedCount += documents.length;
    } catch (err) {
      // Ignore duplicate key errors
    }
  }

  return insertedCount;
};

// =======================
// READ OPERATIONS
// =======================

exports.getAllPosts = async (limit = 100) => {
  return await RedditData.find({ data_type: "post" }).limit(limit);
};

exports.getPostById = async (postId) => {
  return await RedditData.findOne({ id: postId });
};

exports.getPostsBySubreddit = async (subreddit) => {
  return await RedditData.find({ subreddit });
};

exports.searchByKeyword = async (keyword) => {
  return await RedditData.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { body: { $regex: keyword, $options: "i" } },
    ],
  });
};

// =======================
// DELETE
// =======================

exports.deletePost = async (postId) => {
  const result = await RedditData.deleteOne({ id: postId });
  return result.deletedCount;
};

// =======================
// COLLECTION STATS
// =======================

exports.getStats = async () => {
  const totalPosts = await RedditData.countDocuments({ data_type: "post" });
  const totalComments = await RedditData.countDocuments({
    data_type: "comment",
  });

  const topSubreddits = await RedditData.aggregate([
    { $match: { data_type: "post" } },
    { $group: { _id: "$subreddit", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return {
    total_posts: totalPosts,
    total_comments: totalComments,
    total_documents: totalPosts + totalComments,
    top_subreddits: topSubreddits,
  };
};
