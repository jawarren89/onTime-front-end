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
    console.log(updateRoutineForm);
  };

  return (
    // <div className="dropdown-container">
    <ul className="dropdown-routine">
      <div className="drop-row1">
        <li className="total-items">
          Tasks: {props.tasks.length ? props.tasks.length : "--"}
        </li>
        <li className="total-time">
          Total time: {props.total_time ? props.total_time : "--"}
        </li>
      </div>
      <li className="routine-description">Description: {props.description}</li>
      <li className="complete-by-text">Complete by:</li>
      <form className="complete-by-form" onSubmit={submitTimeUpdate}>
        <TimeSelector
          selectedRoutine={props.selectedRoutine}
          setSelectedRoutine={props.setSelectedRoutine}
        ></TimeSelector>
        <input
          className="submitform-button btn"
          type="submit"
          value="Update"
        ></input>
      </form>
    </ul>
    // </div>
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
