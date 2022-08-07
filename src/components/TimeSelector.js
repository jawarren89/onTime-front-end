// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import PropTypes from "prop-types";

import DropdownItem from "./DropdownItem";

const TimeSelector = (props) => {
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

  const onTimeChange = (event) => {
    const newTimeForm = { ...props.timeForm };
    newTimeForm[event.target.id] = event.target.value;
    props.setTimeForm(newTimeForm);
  };

  return (
    <div className="time-dropdowns">
      <DropdownItem
        id="hours"
        label="hours"
        options={hoursOptions}
        value={props.timeForm.hours}
        onChange={onTimeChange}
      ></DropdownItem>
      <DropdownItem
        id="minutes"
        label="minutes"
        options={minutesOptions}
        value={props.timeForm.minutes}
        onChange={onTimeChange}
      ></DropdownItem>
      <DropdownItem
        id="meridiem"
        label="meridiem"
        options={meridiemOptions}
        value={props.timeForm.meridiem}
        onChange={onTimeChange}
      ></DropdownItem>
    </div>
  );
};

TimeSelector.propTypes = {
  complete: PropTypes.object.isRequired,
  timeForm: PropTypes.object.isRequired,
  setTimeForm: PropTypes.func.isRequired,
};

export default TimeSelector;
