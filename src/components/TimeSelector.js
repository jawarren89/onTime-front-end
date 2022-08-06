// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import { useState } from "react";
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

  // const toMilitary = (form) => {
  //   if (form[2] === "PM") {
  //     return [form[0] + 12, form[1]];
  //   } else {
  //     return [form[0], form[1]];
  //   }
  // };

  // const handleSubmitTime = (event) => {
  //   event.preventDefault();
  //   console.log("yes");
  //   const military = toMilitary(props.timeForm);
  //   props.updateRoutine(props.routine_id, { complete_time: military });
  // };

  return (
    <div className="time-selector-container">
      {/* <div className="complete-by">Complete by:</div>
      <form className="time-selectors" onSubmit={handleSubmitTime}> */}
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
      {/* </form> */}
    </div>
  );
};

TimeSelector.propTypes = {
  complete: PropTypes.object.isRequired,
  timeForm: PropTypes.object.isRequired,
  setTimeForm: PropTypes.func.isRequired,
  // handleSubmitTime: PropTypes.func.isRequired,
};

export default TimeSelector;
