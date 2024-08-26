import { useState } from "react";
import "./styles/App.css";

const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app_wrap">
      <main>
        <section className="location">
          <div className="city">
            {weather.name
              ? `${weather.name}, ${weather.sys.country}`
              : "---, --"}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </section>
        <div className="main_temp">
          <div className="temp">
            {weather.main ? `${Math.round(weather.main.temp)}°C` : "--°C"}
          </div>
          <div className="weather">
            {weather.weather ? weather.weather[0].main : "--"}
          </div>
          <div className="high_low">
            {weather.main
              ? `${Math.round(weather.main.temp_min)}°C / ${Math.round(
                  weather.main.temp_max
                )}°C`
              : "--°C / --°C"}
          </div>
        </div>
      </main>
      <header>
        <input
          type="text"
          className="search_box"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </header>
    </div>
  );
}

export default App;
