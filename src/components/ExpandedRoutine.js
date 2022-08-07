import "../styles/ExpandedRoutine.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

const ExpandedRoutine = (props) => {
  const [timeForm, setTimeForm] = useState({
    hours: props.complete[0],
    minutes: props.complete[1],
    meridiem: props.complete[2],
  });

  const handleSubmitTime = (event) => {
    event.preventDefault();
    const military = props.toMilitaryDict(timeForm);
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
  complete: PropTypes.array.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default ExpandedRoutine;
