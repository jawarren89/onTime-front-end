import "../styles/RoutineExpanded.css";
import React from "react";
import PropTypes from "prop-types";

import { TimeToMilitary } from "./TimeConversions";
import TimeSelector from "./TimeSelector";

// The RoutineExpanded component holds additional data about each routine,
// and allows the user to update the complete_by time using the TimeSelector
// component.

const RoutineExpanded = (props) => {
  const submitTimeUpdate = (event) => {
    event.preventDefault();
    const updateRoutineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    const time = TimeToMilitary(props.selectedRoutine.complete_time);
    updateRoutineForm.complete_time = time;
    props.updateRoutine(props.routine_id, updateRoutineForm);
    console.log("PUT: routine complete_time updated");
    console.log(updateRoutineForm);
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
          <form className="complete-by-form" onSubmit={submitTimeUpdate}>
            <TimeSelector
              selectedRoutine={props.selectedRoutine}
              setSelectedRoutine={props.setSelectedRoutine}
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

RoutineExpanded.propTypes = {
  routine_id: PropTypes.number.isRequired,
  description: PropTypes.string,
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  complete_time: PropTypes.object,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default RoutineExpanded;
