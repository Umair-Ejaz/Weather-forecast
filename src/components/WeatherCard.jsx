import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiThermometer,
} from "react-icons/wi";

export default function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <p className="text-white text-lg text-center animate-pulse">
        🔍 Search for a city to view weather details.
      </p>
    );
  }

  // Icon based on condition
  const condition = weather.weather[0].main.toLowerCase();
  let WeatherIcon = WiDaySunny;
  let iconColor = "text-yellow-300";
  if (condition.includes("cloud")) {
    WeatherIcon = WiCloud;
    iconColor = "text-gray-300";
  }
  if (condition.includes("rain")) {
    WeatherIcon = WiRain;
    iconColor = "text-blue-400";
  }
  if (condition.includes("snow")) {
    WeatherIcon = WiSnow;
    iconColor = "text-white";
  }

  // Convert sunrise/sunset timestamps
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="text-center text-white space-y-6 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-lg mx-auto">
      {/* City + Condition */}
      <h2 className="text-4xl font-extrabold drop-shadow-lg">{weather.name}</h2>
      <div className="flex justify-center items-center gap-3">
        <WeatherIcon size={70} className={`${iconColor} drop-shadow-lg`} />
        <p className="capitalize text-lg">{weather.weather[0].description}</p>
      </div>

      {/* Temperature */}
      <p className="text-6xl font-extrabold my-2">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="text-md text-gray-200">
        Feels like <span className="font-semibold">{Math.round(weather.main.feels_like)}°C</span>
      </p>

      {/* Min/Max Temps */}
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex flex-col items-center">
          <WiThermometer size={32} className="text-blue-300" />
          <p className="text-sm">Min</p>
          <p className="text-lg font-bold">{Math.round(weather.main.temp_min)}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <WiThermometer size={32} className="text-red-400" />
          <p className="text-sm">Max</p>
          <p className="text-lg font-bold">{Math.round(weather.main.temp_max)}°C</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
        <div className="flex flex-col items-center">
          <WiHumidity size={36} />
          <p className="text-sm">Humidity</p>
          <p className="text-lg font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind size={36} />
          <p className="text-sm">Wind</p>
          <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
        </div>
        <div className="flex flex-col items-center">
          <WiBarometer size={36} />
          <p className="text-sm">Pressure</p>
          <p className="text-lg font-bold">{weather.main.pressure} hPa</p>
        </div>
        <div className="flex flex-col items-center">
          <WiSunrise size={36} className="text-orange-300" />
          <p className="text-sm">Sunrise</p>
          <p className="text-lg font-bold">{sunrise}</p>
        </div>
        <div className="flex flex-col items-center">
          <WiSunset size={36} className="text-pink-400" />
          <p className="text-sm">Sunset</p>
          <p className="text-lg font-bold">{sunset}</p>
        </div>
      </div>
    </div>
  );
}
