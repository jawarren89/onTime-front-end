import "../styles/NewRoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

// The NewRoutineForm component is used on the EditRoutine page and to add a
// new routine on the AllRoutines page. The values shown for title and
// description are managed in a routineForm state one level about where the form
// is rendered. The form renders a TimeSelector component also, using times
// passed through routineForm. **REMINDER** these times in
// routineForm must be civilian.

const NewRoutineForm = (props) => {
  // const title = props.currentRoutine.title;
  // const description = props.currentRoutine.description;

  return (
    <div>
      <div className="input-container">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          placeholder="title required"
          value={props.routineForm.title}
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
          value={props.routineForm.description}
          onChange={props.onFormChange}
        />
      </div>
      <div>Complete by:</div>
      <TimeSelector
        timeForm={props.routineForm}
        setTimeForm={props.setRoutineForm}
      ></TimeSelector>
    </div>
  );
};

NewRoutineForm.propTypes = {
  currentRoutine: PropTypes.object.isRequired,
  routineForm: PropTypes.object.isRequired,
  setRoutineForm: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default NewRoutineForm;
