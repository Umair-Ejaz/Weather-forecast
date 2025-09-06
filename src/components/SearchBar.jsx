export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    if (!city) return;
    onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-white rounded-full shadow-lg overflow-hidden"
    >
      <input
        type="text"
        name="city"
        placeholder="Enter city name..."
        className="flex-1 px-4 py-3 text-gray-700 outline-none"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 font-semibold hover:opacity-90 transition"
      >
        Search
      </button>
    </form>
  );
}
