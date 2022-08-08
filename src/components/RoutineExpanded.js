import "../styles/ExpandedRoutine.css";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

// The RoutineExpanded component holds additional data about each routine,
// and allows the user to update the CompleteBy time using the TimeSelector
// component. The state of the TimeSelector component is managed here, as well
// as the form submission event.

const RoutineExpanded = (props) => {
  const [timeForm, setTimeForm] = useState(props.complete_time);

  const convertForSubmit = (form, routine_id) => {
    if (form.meridiem === "PM") {
      const timeData = {
        routine_id: routine_id,
        complete_time: {
          hour: parseInt(form.hour) + 12,
          minute: parseInt(form.minute),
        },
      };
      return timeData;
    } else {
      const timeData = {
        routine_id: routine_id,
        complete_time: {
          hour: parseInt(form.hour),
          minute: parseInt(form.minute),
        },
      };
      return timeData;
    }
  };

  //Convert back to military time and add routine_id before submitting.
  const handleSubmitTime = (event) => {
    event.preventDefault();
    const submitTime = convertForSubmit(timeForm, props.routine_id);
    props.updateRoutine(props.routine_id, submitTime);
    console.log(submitTime);
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

RoutineExpanded.propTypes = {
  routine_id: PropTypes.number.isRequired,
  description: PropTypes.string,
  total_time: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  complete_time: PropTypes.object.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  updateRoutine: PropTypes.func.isRequired,
};

export default RoutineExpanded;
