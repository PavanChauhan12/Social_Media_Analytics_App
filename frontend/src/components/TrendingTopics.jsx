import { useEffect, useState } from "react";
import api from "../api/api";

export default function TrendingTopics() {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/topics/trending-topics?top_n=10")
      .then(res => {
        setTopics(res.data.topics || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-5 rounded shadow h-[300px] overflow-auto">

      <h2 className="font-semibold mb-3">Trending Topics</h2>

      {topics.length === 0 ? (
        <p className="text-gray-400">No topics available</p>
      ) : (
        <div className="flex flex-wrap gap-2">

          {topics.map((topic, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {topic.topic}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}
