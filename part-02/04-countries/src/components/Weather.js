import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const baseURL = 'http://api.weatherstack.com/current';
    const ACCESS_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    axios
      .get(`${baseURL}?access_key=${ACCESS_KEY}&query=${capital}`)
      .then((response) => setWeatherData(response.data));
  }, [capital]);

  function showWeather() {
    if (weatherData.current === undefined)
      return <p>Loading weather information...</p>;

    const { temperature, wind_dir, wind_speed, weather_icons } =
      weatherData.current;

    return (
      <React.Fragment>
        <p>
          <b>Temperature: </b>
          {temperature} celsius
        </p>

        <img
          src={`${weather_icons[0]}`}
          alt={`${capital}'s weather forecast`}
          style={{ width: '70px' }}
        />

        <p>
          <b>Wind: </b>
          {wind_speed} mph direction {wind_dir}
        </p>
      </React.Fragment>
    );
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h4>Weather in {capital}</h4>
        {showWeather()}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Weather;
