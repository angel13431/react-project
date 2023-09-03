import React from "react";
import { useState, useEffect } from "react";
import FormattedDate from "./formattedDate";
import WeatherTemp from "./weatherTemp";
// import "./App.css";

export default function (props) {
  let [tempData, setTempData] = useState({ temp: props.info.temp, unit: "c" });
  useEffect(() => {
    setTempData({ temp: props.info.temp, unit: "c" });
  }, [props]);
  return (
    <div className="row">
      {/* <div className="col-1"></div> */}
      <div className="col-3 ms-3">
        <WeatherTemp data={tempData} />
        <div className="">
          <a
            href="#disable"
            onClick={(event) => {
              if (tempData.unit == "f") {
                setTempData({
                  temp: Math.round((tempData.temp - 32) * (5 / 9)),
                  unit: "c",
                });
              }
            }}
          >
            °C
          </a>{" "}
          |
          <a
            href="#disable"
            onClick={(event) => {
              if (tempData.unit == "c") {
                setTempData({
                  temp: Math.round((tempData.temp * 9) / 5 + 32),
                  unit: "f",
                });
              }
            }}
          >
            °F
          </a>
        </div>
      </div>
      <div className="col-5">
        <div className="row">
          <div className="col">
            <FormattedDate data={props.info.date} />
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="col">Humidity: {props.info.humidity}%</div>
        </div>
        <div className="row">
          {" "}
          <div className="col">Wind: {props.info.wind} Km/h</div>
        </div>
      </div>
      {/* <div className="col-1"></div> */}
      <div className="col-2">
        <div className="row">
          <img src={props.info.iconUrl} className="col"></img>
        </div>
        <div className="row">
          <div className="col ">{props.info.condition}</div>
        </div>
      </div>
    </div>
  );
}
