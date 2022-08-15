import "../styles/RoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

import { TimeToMilitary } from "./TimeConversions";

// The RoutineForm component is used to add a routine on the AllRoutines
// page and to edit an existing routine on the EditRoutine page. The values
// are managed with selectedRoutine state in App.

const RoutineForm = (props) => {
  const onRoutineFormChange = (event) => {
    const routineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    routineForm[event.target.name] = event.target.value;
    const time = TimeToMilitary(props.selectedRoutine.complete_time);
    routineForm.complete_time = time;
    props.setSelectedRoutine(routineForm);
  };

  return (
    <React.Fragment>
      <div className="input-container">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          maxLength={40}
          placeholder="title required"
          value={props.selectedRoutine.title}
          onChange={onRoutineFormChange}
          className="input-text"
        />
      </div>
      <div className="input-container">
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          maxLength={110}
          placeholder="add a description (optional)"
          value={props.selectedRoutine.description}
          onChange={onRoutineFormChange}
          className="input-text resizeable"
        />
      </div>
      <div className="input-complete">Complete by:</div>
      <TimeSelector
        selectedRoutine={props.selectedRoutine}
        setSelectedRoutine={props.setSelectedRoutine}
      ></TimeSelector>
    </React.Fragment>
  );
};

RoutineForm.propTypes = {
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
};

export default RoutineForm;
