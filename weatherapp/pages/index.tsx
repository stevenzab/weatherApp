import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  console.log("location", location)

  const handleSearch = async (e) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const baseUrl = "http://api.weatherapi.com/v1";
    const endpoint = `${baseUrl}/current.json?key=${apiKey}&q=${e.trim()}&limit=5`;

    const response = await fetch(endpoint);

    const data = await response.json();
    setWeatherData(data);

    if (response) {
      console.log("API Endpoint:", endpoint);
    } else {
      console.error("Error fetching weather data:",);
    }

  }

  const onInputChange = (e:
    ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLocation(value);

    if (value == '') {
      return
    }

    handleSearch(value);

  }



  // useEffect(() => {
  //   async function fetchWeather() {
  //     const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  //     const baseUrl = "http://api.weatherapi.com/v1";
  //     const endpoint = `${baseUrl}/current.json?key=${apiKey}&q=${location}`;

  //     console.log("API Endpoint:", endpoint);

  //     try {
  //       const response = await fetch(endpoint);

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       setWeatherData(data);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }
  //   }

  //   if (location) {
  //     fetchWeather();
  //   }
  // }, [location]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <div>

        <p className="flex justify-center text-center">
          Weather In Paris
        </p>
      </div>
      <form className="flex justify-center">
        <input
          type="text"
          value={location}
          onChange={onInputChange}
          placeholder="Enter location"
          className="p-2 border border-gray-400 rounded"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
      </form>
      {error && <p className="flex justify-center text-center text-red-500">{error}</p>}
      {weatherData ? (
        <div className="weather-container">
          <p>Location: {weatherData.location?.name}</p>
          <p>Temperature: {weatherData.current?.temp_c}°C</p>
          <p>Condition: {weatherData.current?.condition.text}</p>
          <p>Wind: {weatherData.current?.wind_kph} km/h</p>
          <p>Humidity: {weatherData.current?.humidity} %</p>
          <p>UV: {weatherData.current?.uv}</p>
        </div>
      ) : (
        <p className="flex justify-center text-center">Loading...</p>
      )}
    </>
  );
}
