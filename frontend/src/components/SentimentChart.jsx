import { useEffect, useState } from "react";
import api from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SentimentChart() {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    api.get("/sentiment/stats")
      .then(res => {
        const dist = res.data.sentiment_distribution || {};

        const formatted = [
          { name: "Positive", value: dist.Positive || 0 },
          { name: "Negative", value: dist.Negative || 0 },
          { name: "Neutral", value: dist.Neutral || 0 },
        ];

        setChartData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  if (!chartData) {
    return (
      <div className="bg-white p-5 rounded shadow h-[300px] flex items-center justify-center">
        Loading Chart...
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded shadow h-[300px]">

      <h2 className="font-semibold mb-3">Sentiment Distribution</h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            <Cell fill="#22c55e" />
            <Cell fill="#ef4444" />
            <Cell fill="#64748b" />
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}
