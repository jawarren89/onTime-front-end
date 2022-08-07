import "../styles/NewRoutineForm.css";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

import TimeSelector from "./TimeSelector";

const NewRoutineForm = (props) => {
  return (
    <div>
      <div className="input-container">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={props.routineForm.title}
          onChange={props.onFormChange}
          className="input-title"
        />
      </div>
      <div>
        <label htmlFor="owner">Description: </label>
        <input
          type="text"
          name="description"
          value={props.routineForm.owner}
          onChange={props.onFormChange}
        />
      </div>
      <TimeSelector
        complete={props.complete}
        timeForm={props.routineForm}
        setTimeForm={props.setRoutineForm}
      ></TimeSelector>
    </div>
  );
};

NewRoutineForm.propTypes = {};

export default NewRoutineForm;
