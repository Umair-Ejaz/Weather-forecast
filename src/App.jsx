import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import WeeklyForecast from "./components/WeeklyForecast";
import { getCurrentWeather, getForecast } from "./services/weatherService";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      alert("❌ City not found or API issue!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 flex flex-col items-center p-4 sm:p-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 sm:mb-10 drop-shadow-lg text-center">
        🌦️ Weather Dashboard
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-lg sm:max-w-2xl mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-white text-lg animate-pulse mt-6">
          Fetching weather data...
        </div>
      )}

      {/* Weather Info + Forecast */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-10 mt-6">
        {/* Weather Card */}
        <div className="flex-1 backdrop-blur-2xl bg-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30">
          <WeatherCard weather={weather} />
        </div>

        {/* Forecast Section */}
        <div className="flex-1 backdrop-blur-2xl bg-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30">
          <ForecastChart forecast={forecast} />

          {/* Make weekly forecast scrollable on mobile */}
          <div className="mt-6 overflow-x-auto">
            <WeeklyForecast forecast={forecast} />
          </div>
        </div>
      </div>
    </div>
  );
}
