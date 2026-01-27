import { useEffect, useState } from "react";
import KPICards from "../components/KPICards";
import SentimentChart from "../components/SentimentChart";
import TrendingTopics from "../components/TrendingTopics";
import TopPostsTable from "../components/TopPostsTable";
import SentimentTimeline from "../components/charts/SentimentTimeline";
import SubredditFilter from "../components/SubredditFilter";
import IngestPanel from "../components/IngestPanel";
import api from "../api/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [subreddit, setSubreddit] = useState("all");

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const url = subreddit === "all"
        ? "/sentiment/timeline"
        : `/sentiment/timeline?subreddit=${subreddit}`;

      const res = await api.get(url);

      if (res.data.success) {
        setTimelineData(res.data.timeline);
      }

      setLoading(false);
    } catch (error) {
      console.error("Timeline fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [subreddit]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-8">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Social Media Analytics Dashboard
    </h1>

    <p className="text-sm text-slate-500 mt-1">
      Live Reddit Sentiment Monitor
    </p>
  </div>

  <SubredditFilter
    selected={subreddit}
    onChange={setSubreddit}
  />

</div>

    {/* Ingest Panel */}
    <IngestPanel onSuccess={fetchTimeline} />

    {/* KPI Cards */}
    <KPICards subreddit={subreddit} />

    {/* Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

      {/* Sentiment Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
        <h3 className="font-semibold text-lg mb-4">
          📊 Sentiment Distribution
        </h3>
        <SentimentChart subreddit={subreddit} />
      </div>

      {/* Sentiment Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">
            📈 Sentiment Timeline
          </h3>

          <span className="text-xs text-slate-500">
            Daily Average
          </span>
        </div>

        <SentimentTimeline data={timelineData} />
      </div>

    </div>

    {/* Trending Topics */}
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <h3 className="font-semibold text-lg mb-4">
        🔥 Trending Topics
      </h3>

      <TrendingTopics subreddit={subreddit} />
    </div>

    {/* Top Posts */}
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <h3 className="font-semibold text-lg mb-4">
        🚀 Top Viral Posts
      </h3>

      <TopPostsTable subreddit={subreddit} />
    </div>

  </div>
);
}