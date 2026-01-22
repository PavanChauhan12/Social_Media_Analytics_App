import { useEffect, useState } from "react";
import api from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#64748b"];

export default function SentimentChart() {

  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/sentiment/stats")
      .then(res => {

        const dist = res.data.sentiment_distribution || {};

        const formatted = [
          { name: "Positive", value: dist.Positive || 0 },
          { name: "Negative", value: dist.Negative || 0 },
          { name: "Neutral", value: dist.Neutral || 0 },
        ];

        const sum = formatted.reduce(
          (acc, cur) => acc + cur.value,
          0
        );

        setChartData(formatted);
        setTotal(sum);
      })
      .catch(err => console.error(err));

  }, []);

  if (!chartData.length) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-400 animate-pulse">
        Loading sentiment distribution...
      </div>
    );
  }

  return (
    <div className="relative h-[300px]">

      {/* Center Total Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

        <p className="text-sm text-slate-500">
          Total Analyzed
        </p>

        <h2 className="text-3xl font-bold text-slate-800">
          {total}
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={4}
            stroke="none"
            isAnimationActive
          >

            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name) => [
              value,
              `${name} Sentiment`
            ]}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
              backgroundColor: "#ffffff"
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            height={30}
            formatter={(value) => (
              <span className="text-sm text-slate-600">
                {value}
              </span>
            )}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
