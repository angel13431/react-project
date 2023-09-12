import React, { useState, useEffect } from "react";

export default function WeatherForecast(props) {
  console.log(props);
  let [temp, setTemp] = useState({});

  useEffect(() => {
    if (props.unit == "f") {
      setTemp({
        min: Math.round((props.info.temperature.minimum * 9) / 5 + 32),
        max: Math.round((props.info.temperature.maximum * 9) / 5 + 32),
      });
    } else {
      setTemp({
        min: Math.round(props.info.temperature.minimum),
        max: Math.round(props.info.temperature.maximum),
      });
    }
  }, [props]);

  function getDay(timeStamp) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[new Date(timeStamp * 1000).getDay()];
    return day;
  }

  return (
    <div className="col">
      <div>{getDay(props.info.time)}</div>
      <div>
        <img src={props.info.condition.icon_url} />
      </div>
      <div>
        <span>{temp.max}° </span>
        <span className="text-secondary">{temp.min}°</span>
      </div>
    </div>
  );
}
