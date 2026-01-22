import { useEffect, useState } from "react";
import api from "../api/api";

// --------------------
// Counter Animation Hook
// --------------------

function useCounter(value, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value, duration]);

  return count;
}

// --------------------
// Main Component
// --------------------

export default function KPICards({ subreddit }) {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const url =
        subreddit === "all"
            ? "/sentiment/stats"
            : `/sentiment/stats?subreddit=${subreddit}`;

        api.get(url)
            .then(res => setStats(res.data))
            .catch(err => console.error(err));

    }, [subreddit]);

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[1,2,3,4].map(i => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow animate-pulse h-24"
          />
        ))}
      </div>
    );
  }

  const positive =
    stats.sentiment_distribution?.Positive || 0;

  const negative =
    stats.sentiment_distribution?.Negative || 0;

  const total = stats.analyzed_posts || 1;

  const positivePercent = ((positive / total) * 100).toFixed(1);
  const negativePercent = ((negative / total) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      <StatCard
        title="Total Posts"
        value={stats.total_posts}
        icon="📦"
        gradient="from-indigo-500 to-blue-500"
      />

      <StatCard
        title="Positive Sentiment"
        value={`${positivePercent}%`}
        icon="😊"
        gradient="from-green-500 to-emerald-500"
      />

      <StatCard
        title="Negative Sentiment"
        value={`${negativePercent}%`}
        icon="😠"
        gradient="from-red-500 to-pink-500"
      />

      <StatCard
        title="Avg Sentiment Score"
        value={(Number(stats.avg_sentiment_score) || 0).toFixed(3)}
        icon="📊"
        gradient="from-purple-500 to-indigo-500"
      />

    </div>
  );
}

// --------------------
// Reusable Card Component
// --------------------

function StatCard({ title, value, icon, gradient }) {

  const numericValue =
    typeof value === "string"
      ? parseFloat(value)
      : value;

  const animatedValue = useCounter(
    isNaN(numericValue) ? 0 : numericValue
  );

  const displayValue =
    typeof value === "string" && value.includes("%")
      ? `${animatedValue}%`
      : animatedValue;

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">

        <p className="text-slate-500 text-sm font-medium">
          {title}
        </p>

        <span className="text-xl">
          {icon}
        </span>

      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold text-slate-800">
        {displayValue}
      </h2>

      {/* Gradient Progress Bar */}
      <div
        className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${gradient}`}
      />

    </div>
  );
}
