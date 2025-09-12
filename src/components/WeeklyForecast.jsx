import { WiCloud, WiDaySunny, WiRain, WiSnow } from "react-icons/wi";

export default function WeeklyForecast({ forecast }) {
  if (!forecast) return null;

  // Group by date (first entry per day)
  const dailyData = [];
  const seenDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const key = date.toLocaleDateString();

    if (!seenDates.has(key)) {
      seenDates.add(key);

      const condition = item.weather[0].main.toLowerCase();
      let Icon = WiDaySunny;
      if (condition.includes("cloud")) Icon = WiCloud;
      if (condition.includes("rain")) Icon = WiRain;
      if (condition.includes("snow")) Icon = WiSnow;

      dailyData.push({
        day,
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        Icon,
      });
    }
  });

  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
      {dailyData.slice(0, 7).map((d, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center p-4 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg text-white"
        >
          <p className="font-semibold">{d.day}</p>
          <d.Icon size={40} className="my-2 text-yellow-300" />
          <p className="text-sm">Max: {d.tempMax}°C</p>
          <p className="text-sm">Min: {d.tempMin}°C</p>
        </div>
      ))}
    </div>
  );
}
