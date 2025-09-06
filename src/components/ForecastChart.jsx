import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ForecastChart({ forecast }) {
  if (!forecast) return null;

  const data = forecast.list
    .filter((_, index) => index % 8 === 0)
    .map((item) => ({
      date: new Date(item.dt_txt).toLocaleDateString(),
      temp: item.main.temp,
    }));

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">5-Day Temperature Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
