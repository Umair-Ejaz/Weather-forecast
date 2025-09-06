import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
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
      alert("City not found or API issue!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center">
        🌤 Weather Forecast
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-xl mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-white text-lg animate-pulse mt-6">
          Fetching weather data...
        </div>
      )}

      {/* Weather Info + Forecast */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 mt-8">
        {/* Weather Card */}
        <div className="flex-1 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
          <WeatherCard weather={weather} />
        </div>

        {/* Forecast Chart */}
        <div className="flex-1 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
          <ForecastChart forecast={forecast} />
        </div>
      </div>
    </div>
  );
}
