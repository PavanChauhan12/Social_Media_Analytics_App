import { useEffect, useState } from "react";
// import { fetchTimeline } from "../api/sentimentApi";
import KPICards from "../components/KPICards";
import SentimentChart from "../components/SentimentChart";
import TrendingTopics from "../components/TrendingTopics";
import TopPostsTable from "../components/TopPostsTable";
import SentimentTimeline from "../components/charts/SentimentTimeline";
import axios from "axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState([]);

  const fetchTimeline = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/sentiment/timeline");

    console.log("TIMELINE API RESPONSE:", JSON.stringify(res));

    if (res.data.success) {
      setTimelineData(res.data.timeline);
    }
  } catch (error) {
    console.error("Timeline fetch error:", error);
  }
};

console.log("TIMELINE DATA IN DASHBOARD:", timelineData);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    fetchTimeline();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-slate-100 px-8 py-6">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Social Media Analytics Dashboard
      </h1>

      <span className="text-sm text-slate-500">
        Live Reddit Sentiment Monitor
      </span>
    </div>

    {/* KPI Cards */}
    <KPICards />

    {/* Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

      {/* Sentiment Distribution */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <h3 className="font-semibold text-lg mb-4">
          📊 Sentiment Distribution
        </h3>
        <SentimentChart />
      </div>

      {/* Sentiment Timeline */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
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
    <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border">
      <h3 className="font-semibold text-lg mb-4">
        🔥 Trending Topics
      </h3>

      <TrendingTopics />
    </div>

    {/* Top Posts */}
    <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border">
      <h3 className="font-semibold text-lg mb-4">
        🚀 Top Viral Posts
      </h3>

      <TopPostsTable />
    </div>

  </div>
);
}