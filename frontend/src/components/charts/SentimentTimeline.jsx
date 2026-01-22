import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SentimentTimeline({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500">No timeline data</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb"/>
        
        <XAxis dataKey="_id" tick={{ fontSize: 12 }} tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
            })}/>
        <YAxis domain={[-1, 1]} tick={{ fontSize: 12 }} tickFormatter={(v) => v.toFixed(1)} />

        <Tooltip
            contentStyle={{
                backgroundColor: "ffffff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb"
            }}
        />

        <Line
          type="monotone"
          dataKey="avgSentiment"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 5, fill: "#2563eb" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
