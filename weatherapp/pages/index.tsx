import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeatherData = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const baseUrl = "http://api.weatherapi.com/v1";
    const endpoint = `${baseUrl}/current.json?key=${apiKey}&q=${query.trim()}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null); // clear previous errors
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // clear previous weather data
    }
  };

  const fetchSuggestions = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const baseUrl = "http://api.weatherapi.com/v1";
    const endpoint = `${baseUrl}/search.json?key=${apiKey}&q=${query.trim()}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Error fetching suggestions");
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(value);
  };

  const onSuggestionClick = (suggestion: any) => {
    setLocation(suggestion.name);
    setSuggestions([]);
    fetchWeatherData(suggestion.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-lime-400 to-sky-400 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Weather Finder
        </h1>
        <form className="flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={location}
            onChange={onInputChange}
            placeholder="Enter location"
            className="p-3 w-full border border-gray-300 rounded mb-4"
          />
          {suggestions.length > 0 && (
            <ul className="w-full border border-gray-300 rounded mb-4 bg-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </form>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {weatherData ? (
          <div className="mt-6 p-6 bg-white rounded shadow-lg text-center">
            <p className="text-lg font-semibold">Location: {weatherData.location?.name}</p>
            <p className="text-lg">Temperature: {weatherData.current?.temp_c}°C</p>
            <p className="text-lg">Condition: {weatherData.current?.condition.text}</p>
            <p className="text-lg">Wind: {weatherData.current?.wind_kph} km/h</p>
            <p className="text-lg">Humidity: {weatherData.current?.humidity} %</p>
            <p className="text-lg">UV: {weatherData.current?.uv}</p>
          </div>
        ) : (
          <p className="text-center mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
}
