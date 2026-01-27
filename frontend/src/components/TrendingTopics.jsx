import { useEffect, useState } from "react";
import api from "../api/api";

export default function TrendingTopics({ subreddit }) {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const url = subreddit === "all" || !subreddit
      ? "/topics/trending-topics?top_n=10"
      : `/topics/trending-topics?top_n=10&subreddit=${subreddit}`;

    api.get(url)
      .then(res => {
        setTopics(res.data.topics || []);
      })
      .catch(err => console.error(err));
  }, [subreddit]);

  if (topics.length === 0) {
    return (
      <div className="h-[260px] flex items-center justify-center text-slate-400 animate-pulse">
        Loading trending topics...
      </div>
    );
  }

  return (
    <div className="relative h-[260px] overflow-y-auto pr-2">

      {/* Fade Scroll Mask */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="flex flex-wrap gap-3">

        {topics.map((topic, index) => {

          // Heat scaling
          const heat =
            index < 3
              ? "from-orange-100 to-red-100 border-orange-200 text-orange-700"
              : index < 6
              ? "from-yellow-100 to-amber-100 border-yellow-200 text-amber-700"
              : "from-blue-50 to-indigo-50 border-blue-100 text-slate-700";

          const badgeColor =
            index < 3
              ? "bg-red-500"
              : index < 6
              ? "bg-amber-500"
              : "bg-blue-600";

          return (
            <div
              key={index}
              title={`TF-IDF Score: ${topic.score?.toFixed(2) || "N/A"}`}
              style={{ animationDelay: `${index * 60}ms` }}
              className={`animate-fade-in flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${heat} border text-sm font-medium shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-default`}
            >

              {/* Rank */}
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full ${badgeColor} text-white text-xs font-bold`}
              >
                {index + 1}
              </span>

              {/* Topic */}
              <span className="whitespace-nowrap">
                {topic.topic}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}
