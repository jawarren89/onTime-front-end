// source: https://www.robinwieruch.de/react-dropdown/

import "../styles/TimeSelector.css";
import React from "react";
import PropTypes from "prop-types";

import { TimeToCivilian, TimeToMilitary } from "./TimeConversions";
import {
  hoursOptions,
  minutesOptions,
  meridiemOptions,
} from "./TimeDropdownData";

import TimeDropdown from "./TimeDropdown";

// The TimeSelector component is a 3-part dropdown to select hours, minutes,
// and meridiem. Dropdown options are listed in TimeDropdownData and mapped
// into the individual TimeDropdown components. Default time values shown
// are passed through the state selectedRoutine.

// The value of each timeForm object MUST be passed as strings to be compatible
// across the hr/min/meridiem values in TimeSelector. They are converted back to
// military time on form change before utilizing setSelectedRoutine to update
// the state of the form.

const TimeSelector = (props) => {
  const civCompleteTime = TimeToCivilian(props.selectedRoutine.complete_time);

  const onTimeChange = (event) => {
    const updateRoutineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    const eventConvert = TimeToMilitary(
      event.target.id,
      event.target.value,
      civCompleteTime
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
