import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";

// چرا زمان رو پرت و پلا نشون میده؟! :|
export default function Weather() {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [city, setCity] = useState("");

  useEffect(() => {
    searchCity("Tehran");
  }, []);

  function searchCity(givenCity) {
    const apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${givenCity}&key=${apiKey}`;

    axios.get(apiUrl).then((response) => {
      console.log(response);
      if (response.data.status == "not_found") {
        alert(
          "Hmmm...there has been a problem with the city you entered, please try again."
        );
      } else {
        setWeatherData({
          ready: true,
          date: response.data.time,
          city: response.data.city,
          condition: response.data.condition.description,
          iconUrl: response.data.condition.icon_url,
          temp: Math.round(response.data.temperature.current),
          // tempUnit: "m",
          humidity: response.data.temperature.humidity,
          wind: response.data.wind.speed,
        });
      }
    });
  }

  if (weatherData.ready) {
    return (
      <div className="container">
        <div className="appl border">
          <div className="row">
            {/* <div className="col-3"></div> */}

            <form
              className="ms-2 mt-2 input-group "
              onSubmit={(event) => {
                event.preventDefault();
                searchCity(city);
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
              </div>{" "}
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
          <WeatherInfo info={weatherData} />
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
