export default function WeatherCard({ weather }) {
  if (!weather) {
    return <p className="text-white text-lg text-center">Search for a city to view weather details.</p>;
  }

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
      <p className="capitalize text-lg">{weather.weather[0].description}</p>
      <p className="text-6xl font-extrabold my-4">{Math.round(weather.main.temp)}°C</p>

      <div className="flex justify-center gap-6 mt-4">
        <div>
          <p className="text-sm">Humidity</p>
          <p className="text-xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm">Wind</p>
          <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
