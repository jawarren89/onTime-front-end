import "../styles/ExpandedRoutine.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

const ExpandedRoutine = (props) => {
  const [timeForm, setTimeForm] = useState(props.complete);

  const timeToMilitaryDict = (form) => {
    if (form.meridiem === "PM") {
      const timeData = {
        complete_time: {
          hour: parseInt(form.hours) + 12,
          minute: parseInt(form.minutes),
        },
      };
      return timeData;
    } else {
      const timeData = {
        complete_time: {
          hour: parseInt(form.hours),
          minute: parseInt(form.minutes),
        },
      };
      return timeData;
    }
  };

  const handleSubmitTime = (event) => {
    event.preventDefault();
    const military = timeToMilitaryDict(timeForm);
    console.log(military);
    props.updateRoutine(props.routine_id, military);
  };

  return (
    <div className="drop-down-container">
      <ul className="drop-down">
        <div className="drop-row1">
          <li className="total-tasks">
            Tasks: {props.tasks.length ? props.tasks.length : "--"}
          </li>
          <li className="total-time">
            Total time: {props.total_time ? props.total_time : "--"}
          </li>
        </div>
        <li className="description">Description: {props.description}</li>
        <li className="time-selector-container">
          <div className="complete-by-text">Complete by:</div>
          <form className="complete-by-form" onSubmit={handleSubmitTime}>
            <TimeSelector
              complete={props.complete}
              timeForm={timeForm}
              setTimeForm={setTimeForm}
            ></TimeSelector>
            <input
              className="update-button"
              type="submit"
              value="Update"
            ></input>
          </form>
        </li>
      </ul>
    </div>
  );
};

ExpandedRoutine.propTypes = {
  routine_id: PropTypes.number.isRequired,
  description: PropTypes.string,
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  complete: PropTypes.object.isRequired,
  setComplete: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default ExpandedRoutine;
