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

  const hoursOptions = [
    "--",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  // is the only way to get this list to type out all the strings?
  const minutesOptions = [
    "--",
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];

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

TimeSelector.propTypes = {
  complete_time: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
};

export default TimeSelector;
