import { useEffect, useState } from 'react';


export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {

      const apiKey = process.env.API_KEY;
      const baseUrl = "http://api.weatherapi.com/v1";
      const days = 5;
      const endpoint = `${baseUrl}/forecast.json?key=${apiKey}&days=${days}&q=London`;
      console.log("API Endpoint:", endpoint);

      try {
        const response = await fetch(endpoint);

        if (response.ok) {
          console.log('Response:', response);
        } else {
          console.error('Error:', response.statusText);
          console.log(response)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <>
      <p className="flex justify-center text-center">
        Weather App
      </p>
      {error && <p className="flex justify-center text-center text-red-500">{error}</p>}
      {weatherData ? (
        <div className="weather-container">
          <p>Location: {weatherData}</p>
          {/* <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p> */}
          {/* Add more weather data as needed */}
        </div>
      ) : (
        <p className="flex justify-center text-center">Loading...</p>
      )}
    </>
  );
}
