import "../styles/NewRoutineForm.css";
import React from "react";
import PropTypes from "prop-types";

import TimeSelector from "./TimeSelector";

const NewRoutineForm = (props) => {
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
          value={props.routineForm.owner}
          onChange={props.onFormChange}
        />
      </div>
      <div>Complete by:</div>
      <TimeSelector
        complete={props.complete}
        timeForm={props.routineForm}
        setTimeForm={props.setRoutineForm}
      ></TimeSelector>
    </div>
  );
};

NewRoutineForm.propTypes = {
  routineForm: PropTypes.object.isRequired,
  setRoutineForm: PropTypes.func.isRequired,
  complete: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
};

export default NewRoutineForm;
