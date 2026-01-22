import { useEffect, useState } from "react";
import api from "../api/api";

export default function KPICards() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/sentiment/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white p-4 rounded shadow animate-pulse h-20"/>
        ))}
      </div>
    );
  }

  const positive =
    stats.sentiment_distribution?.Positive || 0;

  const negative =
    stats.sentiment_distribution?.Negative || 0;

  const total = stats.analyzed_posts || 1;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <Card title="Total Posts" value={stats.total_posts} />

      <Card
        title="Positive %"
        value={`${((positive / total) * 100).toFixed(1)}%`}
      />

      <Card
        title="Negative %"
        value={`${((negative / total) * 100).toFixed(1)}%`}
      />

      <Card
        title="Avg Sentiment"
        value={stats.avg_sentiment_score}
      />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
