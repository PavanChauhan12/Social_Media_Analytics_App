const cleaningService = require("../services/dataCleaningService");

exports.cleanPosts = async (req, res) => {
  try {
    const count = await cleaningService.cleanAllPosts();

    res.json({
      success: true,
      cleaned: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.recleanPosts = async (req, res) => {
  try {
    const count = await cleaningService.recleanAllPosts();

    res.json({
      success: true,
      cleaned: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCleaningStats = async (req, res) => {
  const stats = await cleaningService.getCleaningStats();
  res.json(stats);
};

exports.removeEmptyPosts = async (req, res) => {
  const count = await cleaningService.removeEmptyPosts();
  res.json({ removed: count });
};
