// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import PropTypes from "prop-types";

import TimeDropdown from "./TimeDropdown";

// The TimeSelector component is a 3-part dropdown to select hours, minutes,
// and meridiem. Dropdown options are listed here and passed into the
// individual TimeDropdown components. Time values passed in to the dropdowns
// for default values on are through the state object timeForm, managed at the
// level above where the TimeSelector is located and passed with props. timeForm
// object values MUST be passed as strings to be compatible across
// hr/min/meridiem values in TimeSelector.

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
      <TimeDropdown
        id="hours"
        label="hours"
        options={hoursOptions}
        value={props.timeForm.hours}
        onChange={onTimeChange}
      ></TimeDropdown>
      <TimeDropdown
        id="minutes"
        label="minutes"
        options={minutesOptions}
        value={props.timeForm.minutes}
        onChange={onTimeChange}
      ></TimeDropdown>
      <TimeDropdown
        id="meridiem"
        label="meridiem"
        options={meridiemOptions}
        value={props.timeForm.meridiem}
        onChange={onTimeChange}
      ></TimeDropdown>
    </div>
  );
};

TimeSelector.propTypes = {
  timeForm: PropTypes.object.isRequired,
  setTimeForm: PropTypes.func.isRequired,
};

export default TimeSelector;
