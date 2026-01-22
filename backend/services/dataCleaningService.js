const RedditData = require("../models/RedditData");
const { cleanText, extractKeywords } = require("../utils/textUtils");

// =======================
// Clean Single Post
// =======================

const cleanSinglePost = (post) => {
  const title = post.title || "";
  const body = post.body || post.selftext || "";

  const combinedText = `${title} ${body}`.trim();

  if (!combinedText) {
    return {
      clean_text: "",
      word_count: 0,
      keywords: [],
    };
  }

  const cleaned = cleanText(combinedText, true);

  return {
    clean_text: cleaned,
    word_count: cleaned.split(" ").length,
    keywords: extractKeywords(combinedText, 5),
  };
};

// =======================
// Clean All Posts
// =======================

exports.cleanAllPosts = async (batchSize = 100) => {
  const query = {
    data_type: "post",
    clean_text: { $exists: false },
  };

  const totalPosts = await RedditData.countDocuments(query);

  if (totalPosts === 0) return 0;

  let cleanedCount = 0;

  const cursor = RedditData.find(query).cursor();

  for (
    let post = await cursor.next();
    post != null;
    post = await cursor.next()
  ) {
    const cleanedData = cleanSinglePost(post);

    await RedditData.updateOne(
      { _id: post._id },
      { $set: cleanedData }
    );

    cleanedCount++;
  }

  return cleanedCount;
};

// =======================
// Re-clean All Posts
// =======================

exports.recleanAllPosts = async () => {
  const posts = await RedditData.find({ data_type: "post" });

  let cleanedCount = 0;

  for (const post of posts) {
    const cleanedData = cleanSinglePost(post);

    await RedditData.updateOne(
      { _id: post._id },
      { $set: cleanedData }
    );

    cleanedCount++;
  }

  return cleanedCount;
};

// =======================
// Cleaning Stats
// =======================

exports.getCleaningStats = async () => {
  const totalPosts = await RedditData.countDocuments({ data_type: "post" });
  const cleanedPosts = await RedditData.countDocuments({
    data_type: "post",
    clean_text: { $exists: true },
  });

  const wordStats = await RedditData.aggregate([
    { $match: { data_type: "post", word_count: { $exists: true } } },
    {
      $group: {
        _id: null,
        avg_word_count: { $avg: "$word_count" },
        max_word_count: { $max: "$word_count" },
        min_word_count: { $min: "$word_count" },
      },
    },
  ]);

  const stats = {
    total_posts: totalPosts,
    cleaned_posts: cleanedPosts,
    uncleaned_posts: totalPosts - cleanedPosts,
    cleaning_percentage:
      totalPosts > 0
        ? ((cleanedPosts / totalPosts) * 100).toFixed(2)
        : 0,
  };

  if (wordStats.length > 0) {
    stats.avg_word_count = wordStats[0].avg_word_count.toFixed(2);
    stats.max_word_count = wordStats[0].max_word_count;
    stats.min_word_count = wordStats[0].min_word_count;
  }

  return stats;
};

// =======================
// Remove Empty Posts
// =======================

exports.removeEmptyPosts = async () => {
  const result = await RedditData.deleteMany({
    data_type: "post",
    $or: [
      { clean_text: "" },
      { clean_text: { $exists: false } },
      { word_count: { $lt: 3 } },
    ],
  });

  return result.deletedCount;
};
