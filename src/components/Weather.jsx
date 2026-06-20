import React, { useState } from "react";
import axios from "axios";

function Weather() {

  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState("");

  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [pressure, setPressure] = useState();
  const [feelslike, setFeelsLike] = useState();

  function handleCity(e){
    setCity(e.target.value);
  }

  function getWeather(){
    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c9c0dc6f41520463d206cdf751feccf&units=metric`);

    weatherData.then(function(response){
      console.log(response.data);
      setWeather(response.data.weather[0].main);
      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWindSpeed(response.data.wind.speed);
      setPressure(response.data.main.pressure);
      setFeelsLike(response.data.main.feels_like);

      setSearchCity(city);setCity("");
      setError("");
      

    }).catch(function(error){
      console.log(error);
      setError("City not found. Please enter a valid city name.");
      setCity("");
      

      setWeather("");
      setTemperature("");
      setHumidity("");
      setWindSpeed("");
      setPressure("");
      setFeelsLike("");
      setSearchCity("");
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-red-400 p-4">
        <div className="bg-purple-500 w-full max-w-xl shadow-xl rounded-lg p-8 text-center">
            <div className="text-6xl"> ☀️</div>
        <h1 className="text-4xl font-bold text-white mb-2">Weather Report</h1>
        <p className=" text-lg mb-3">I can help you check the weather in any city!</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-2">
        <input value={city} onChange={handleCity} type="text" placeholder="Enter city name" className="w-full max-w-full p-3 rounded mb-4 border border-violet-800 focus:outline-none text-center placeholder:text-black"/>
        <button onClick={getWeather}className="bg-yellow-300 text-purple-700 font-bold w-1/3 h-12 py-2 px-4 rounded mb-4 hover:bg-yellow-500">Get Weather</button>
        </div>

        {searchCity && (
          <div className="m-4 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-300">📍 {searchCity.toUpperCase()}</h2>
            </div>
          )}

        {error && (
          <div className="mb-3">
            <p className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">{error}</p>
          </div>
        )}

        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center"><b>🌤 Weather :</b> {weather}</h2>
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center "><b>🌡 Temperature :</b> {temperature}°C</h2>
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center"><b>💧 Humidity :</b> {humidity}%</h2>
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center"><b>💨 Wind Speed :</b> {windSpeed} m/s</h2>
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center"><b>⚡ Pressure :</b> {pressure} hPa</h2>
            <h2 className="bg-white/6 rounded-lg p-2 flex justify-center items-center"><b>🌡 Feels Like :</b> {feelslike}°C</h2>
          </div>
        )}

        </div>
        </div>
  );
}

export default Weather;