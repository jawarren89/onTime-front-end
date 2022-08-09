import "../styles/RoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

// The RoutineForm component is used to add a routine on the AllRoutines
// page and to edit an existing routine on the EditRoutine page. The values
// are managed with selectedRoutine state in App.js.

const RoutineForm = (props) => {
  return (
    <div>
      <div className="input-container">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          placeholder="title required"
          value={props.selectedRoutine.title}
          onChange={props.onFormChange}
          className="input-title"
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          placeholder="add a description (optional)"
          value={props.selectedRoutine.description}
          onChange={props.onFormChange}
        />
      </div>
      <div>Complete by:</div>
      <TimeSelector
        timeForm={props.selectedRoutine.complete_time}
        setTimeForm={props.setSelectedRoutine}
        onChange={props.onFormChange}
      ></TimeSelector>
    </div>
  );
};

RoutineForm.propTypes = {
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default RoutineForm;