import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/NewRoutineForm.css";

const defaultRoutineForm = {
  title: "",
  description: "",
  complete_by: "--",
};

const NewRoutineForm = (props) => {
  const [routineForm, setRoutineForm] = useState(defaultRoutineForm);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newRoutineForm = { ...routineForm };
    newRoutineForm[stateName] = inputValue;

    setRoutineForm(newRoutineForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBoardCallback(routineForm);
    setRoutineForm(defaultRoutineForm);
    // set form back to hidden
  };

  return (
    <section className="boardform-container">
      <h2>New Routine</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={routineForm.title}
            onChange={onFormChange}
            className="input-title"
          />
        </div>
        <div>
          <label htmlFor="owner">Description: </label>
          <input
            type="text"
            name="description"
            value={routineForm.owner}
            onChange={onFormChange}
          />
        </div>
        <div className="button-container">
          <input
            className="startButton"
            type="submit"
            value="Add Routine"
            disabled={
              routineForm.title.length < 1 ||
              routineForm.title.length > 40 ||
              routineForm.description.length > 110
            }
          ></input>
        </div>
      </form>
    </section>
  );
};

NewRoutineForm.propTypes = {
  addRoutineCallback: PropTypes.func.isRequired,
};

export default NewRoutineForm;
