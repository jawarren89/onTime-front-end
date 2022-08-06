// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import DropdownItem from "./DropdownItem";

const TimeSelector = (props) => {
  const [hours, setHours] = useState(
    props.complete_time ? props.complete_time.hour : "--"
  );
  const [minutes, setMinutes] = useState(
    props.complete_time ? props.complete_time.minute : "--"
  );

  const [meridiem, setMeridiem] = useState("--");

  const hoursOptions = ["--", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutesOptions = [...Array(60).keys()];

  // my array maps numbes 0 to 59, but doesn't show -- or double digits for nums
  // less than 10. is the only way to get that to type out all the strings from --, 00, 01, 02, to 60?
  // const minutesOptions = [
  // "--"
  //   "00",
  //   "01",
  //   "02",
  //   "03",
  //   "04",
  //   "05",
  //   "06",
  //   "07",
  //   "08",
  //   "09",
  // ];

  const meridiemOptions = ["AM", "PM"];

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleMeridiemChange = (event) => {
    setMeridiem(event.target.value);
  };

  return (
    <div className="time-selector-container">
      <div className="complete-by">Complete by:</div>
      <div className="time-selectors">
        <DropdownItem
          label="Hour: "
          options={hoursOptions}
          value={hours}
          onChange={handleHoursChange}
        ></DropdownItem>
        <DropdownItem
          label="Minute: "
          options={minutesOptions}
          value={minutes}
          onChange={handleMinutesChange}
        ></DropdownItem>
        <DropdownItem
          label="AM/PM: "
          options={meridiemOptions}
          value={meridiem}
          onChange={handleMeridiemChange}
        ></DropdownItem>
      </div>
    </div>
  );
};

export default TimeSelector;
