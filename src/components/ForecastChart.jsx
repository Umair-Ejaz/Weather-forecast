import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ForecastChart({ forecast }) {
  if (!forecast) return null;

  // Group by date (first reading for each day)
  const dailyData = [];
  const seenDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyData.push({
        date,
        temp: item.main.temp,
      });
    }
  });

  return (
    <div className="bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-blue-500/30 shadow-2xl rounded-2xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        📈 7-Day Temperature Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              background: "rgba(30,30,46,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#facc15"
            strokeWidth={3}
            dot={{ fill: "#facc15", r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
