import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wdnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (props.data) {
    let time = new Date(props.data * 1000);
    let day = days[time.getDay()];
    let hour = time.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = time.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }

    return (
      <div>
        {day} {hour}:{minute}
      </div>
    );
  } else {
    return null;
  }
}
