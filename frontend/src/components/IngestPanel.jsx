import { useState } from "react";
import api from "../api/api";

export default function IngestPanel({ onSuccess }) {

  const [subreddit, setSubreddit] = useState("");
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleIngest = async () => {
    if (!subreddit.trim()) {
      setMessage("❌ Enter subreddit name");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await api.post(
        "/reddit/ingest",
        {
          subreddit,
          limit
        }
      );

      if (res.data.success) {
        setMessage(`✅ Ingested ${res.data.inserted} posts from r/${subreddit}`);

        onSuccess && onSuccess(); // refresh dashboard

        setSubreddit("");
      }

    } catch (err) {
      console.error(err);
      setMessage("❌ Ingestion failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border mb-6">

      <h3 className="font-semibold text-lg mb-3">
        📥 Ingest Reddit Data
      </h3>

      <div className="flex flex-wrap gap-3 items-center">

        {/* Subreddit Input */}
        <input
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="Enter subreddit (eg: startups)"
          className="border px-4 py-2 rounded-lg w-52 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Limit Input */}
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border px-3 py-2 rounded-lg w-28"
          min={10}
          max={200}
        />

        {/* Button */}
        <button
          onClick={handleIngest}
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-semibold text-white
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Fetching..." : "Ingest"}
        </button>

      </div>

      {/* Status Message */}
      {message && (
        <p className="mt-3 text-sm font-medium">
          {message}
        </p>
      )}

    </div>
  );
}
