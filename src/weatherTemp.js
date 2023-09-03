import React from "react";
import { useState } from "react";

export default function WeatherTemp(props) {
  return (
    <h1 className="col">
      {props.data.temp} °{props.data.unit.toUpperCase()}
    </h1>
  );
}
