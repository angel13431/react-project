import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";

export default function Weather() {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [city, setCity] = useState("");
  let [forecast, setForecast] = useState({});

  useEffect(() => {
    searchCity("Tehran");
  }, []);

  function searchCity(givenCity) {
    const apiKey = "t59d1foebd7d6a037ffd3299548b5a20";

    let urls = [
      `https://api.shecodes.io/weather/v1/current?query=${givenCity}&key=${apiKey}`,
      `https://api.shecodes.io/weather/v1/forecast?query=${givenCity}&key=${apiKey}`,
    ];
    const requests = urls.map((url) => axios.get(url));

    axios.all(requests).then((responses) => {
      if (responses[0].data.status == "not_found") {
        alert(
          "Hmmm...there has been a problem with the city you entered, please try again."
        );
      } else {
        setWeatherData({
          ready: true,
          date: responses[0].data.time,
          city: responses[0].data.city,
          condition: responses[0].data.condition.description,
          iconUrl: responses[0].data.condition.icon_url,
          temp: Math.round(responses[0].data.temperature.current),
          // tempUnit: "m",
          humidity: responses[0].data.temperature.humidity,
          wind: responses[0].data.wind.speed,
        });
        setForecast({ response: responses[1] });
      }
    });
  }
  if (weatherData.ready) {
    return (
      <div className="container">
        <div className="appl border">
          <div className="row">
            <form
              className="ms-2 mt-2 input-group "
              onSubmit={(event) => {
                event.preventDefault();
                searchCity(city);
                setWeatherData({ ready: false });
              }}
            >
              <div className="col-8">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search city..."
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                ></input>
              </div>
              <div className=" ms-5 col-2">
                <input
                  type="submit"
                  className="btn btn-primary w-100"
                  value="Search"
                ></input>
              </div>
            </form>
          </div>
          <h2>{weatherData.city}</h2>
          <WeatherInfo info={weatherData} forecastInfo={forecast} />
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
