// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import PropTypes from "prop-types";

import { TimeToCivilian } from "./TimeConversions";
import { TimeToMilitary } from "./TimeConversions";
import TimeDropdown from "./TimeDropdown";

// The TimeSelector component is a 3-part dropdown to select hours, minutes,
// and meridiem. Dropdown options are listed here and mapped into the
// individual TimeDropdown components.

// Default time values shown are passed through the state selectedRoutine, which is
// is managed in App.js. It is an object that contains the routine_id,
// the routine's complete_time, and every other routine attribute.

// The value of each timeForm object MUST be passed as strings to be compatible
// across the hr/min/meridiem values in TimeSelector. They are converted back to
// military time on form change before utilizing setSelectedRoutine to update
// the state of the form.

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

  const civCompleteTime = TimeToCivilian(props.selectedRoutine.complete_time);

  const onTimeChange = (event) => {
    const updateRoutineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    const eventConvert = TimeToMilitary(
      event.target.id,
      event.target.value,
      civCompleteTime.meridiem
    );
    updateRoutineForm.complete_time[eventConvert.id] = eventConvert.value;
    props.setSelectedRoutine(updateRoutineForm);
  };

  return (
    <div className="time-dropdowns">
      <TimeDropdown
        id="hour"
        label="hour"
        options={hoursOptions}
        value={civCompleteTime.hour}
        onChange={onTimeChange}
      ></TimeDropdown>
      <TimeDropdown
        id="minute"
        label="minute"
        options={minutesOptions}
        value={civCompleteTime.minute}
        onChange={onTimeChange}
      ></TimeDropdown>
      <TimeDropdown
        id="meridiem"
        label="meridiem"
        options={meridiemOptions}
        value={civCompleteTime.meridiem}
        onChange={onTimeChange}
      ></TimeDropdown>
    </div>
  );
};

TimeSelector.propTypes = {
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
};

export default TimeSelector;
