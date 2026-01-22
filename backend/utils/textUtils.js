const natural = require("natural");
const stopword = require("stopword");

const tokenizer = new natural.WordTokenizer();

// Basic text cleaning
exports.cleanText = (text, removeStopwords = true) => {
  if (!text) return "";

  // Lowercase
  let cleaned = text.toLowerCase();

  // Remove URLs
  cleaned = cleaned.replace(/http\S+|www\S+/g, "");

  // Remove punctuation and numbers
  cleaned = cleaned.replace(/[^a-z\s]/g, " ");

  // Tokenize
  let tokens = tokenizer.tokenize(cleaned);

  // Remove stopwords
  if (removeStopwords) {
    tokens = stopword.removeStopwords(tokens);
  }

  // Remove short tokens
  tokens = tokens.filter((t) => t.length > 2);

  return tokens.join(" ");
};

// Keyword extraction (frequency-based)
exports.extractKeywords = (text, topN = 5) => {
  if (!text) return [];

  const cleaned = exports.cleanText(text);
  const words = cleaned.split(" ");

  const freqMap = {};

  words.forEach((word) => {
    freqMap[word] = (freqMap[word] || 0) + 1;
  });

  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map((item) => item[0]);
};
