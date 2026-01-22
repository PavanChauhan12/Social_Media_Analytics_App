import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area
} from "recharts";

export default function SentimentTimeline({ data }) {

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-[260px] flex items-center justify-center text-slate-400 animate-pulse">
        Loading sentiment timeline...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>

      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
      >

        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          vertical={false}
        />

        {/* X Axis */}
        <XAxis
          dataKey="_id"
          tick={{ fontSize: 12, fill: "#64748b" }}
          tickFormatter={(d) =>
            new Date(d).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })
          }
        />

        {/* Y Axis */}
        <YAxis
          domain={[-1, 1]}
          tick={{ fontSize: 12, fill: "#64748b" }}
          tickFormatter={(v) => v.toFixed(2)}
        />

        {/* Neutral Zero Line */}
        <ReferenceLine
          y={0}
          stroke="#94a3b8"
          strokeDasharray="4 4"
        />

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => [
            value.toFixed(3),
            "Avg Sentiment"
          ]}
          labelFormatter={(label) =>
            `Date: ${new Date(label).toLocaleDateString()}`
          }
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
          }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Area Fill */}
        <Area
          type="monotone"
          dataKey="avgSentiment"
          stroke="none"
          fill="url(#sentimentGradient)"
        />

        {/* Main Line */}
        <Line
          type="monotone"
          dataKey="avgSentiment"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4, fill: "#2563eb" }}
          activeDot={{ r: 7 }}
          animationDuration={1200}
        />

      </LineChart>

    </ResponsiveContainer>
  );
}
