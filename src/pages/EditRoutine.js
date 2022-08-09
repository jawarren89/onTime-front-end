import "../styles/EditRoutine.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import PageHeader from "../components/PageHeader";
import NewRoutineForm from "../components/NewRoutineForm";
import TaskList from "../components/TaskList";

import add from "../assets/plus-circle.svg";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const { routine_id } = useParams();

  useEffect(() => props.fetchOneRoutine(routine_id), []);

  const showFormOnClick = () => {
    props.toggleAddTaskForm();
  };

  const convertForSubmit = (form) => {
    if (form.complete_time.meridiem === "PM") {
      form.complete_time = {
        hour: parseInt(form.complete_time.hour) + 12,
        minute: parseInt(form.complete_time.minute),
      };
    } else {
      form.complete_time = {
        hour: parseInt(form.complete_time.hour),
        minute: parseInt(form.complete_time.minute),
      };
    }
    return form;
  };

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const updateRoutineForm = { ...props.selectedRoutine };
    updateRoutineForm[stateName] = inputValue;

    props.setSelectedRoutine(updateRoutineForm);
  };

  const handleEditRoutine = (event) => {
    event.preventDefault();
    const submitRoutine = convertForSubmit(
      props.selectedRoutine,
      props.routine_id
    );
    props.updateRoutine(routine_id, submitRoutine);
    console.log(submitRoutine);
  };

  if (props.isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <PageHeader
          pageTitle={props.selectedRoutine.title}
          viewNavSystem={props.viewNavSystem}
        ></PageHeader>
        <main className="editpage-container">
          <h2 className="section-header">
            Edit Routine: {props.selectedRoutine.title}
          </h2>
          <p>You can do this, I believe in you.</p>
          <section className="routineform-container">
            <form onSubmit={handleEditRoutine}>
              <NewRoutineForm
                selectedRoutine={props.selectedRoutine}
                setSelectedRoutine={props.setSelectedRoutine}
                onFormChange={onFormChange}
              ></NewRoutineForm>
              <div className="button-container">
                <input
                  className="startButton"
                  type="submit"
                  value="Update"
                  disabled={
                    props.selectedRoutine.title.length < 1 ||
                    props.selectedRoutine.title.length > 40 ||
                    props.selectedRoutine.description.length > 110
                  }
                ></input>
              </div>
            </form>
          </section>
          <section>
            <h2 className="section-header">List your tasks here!</h2>
            <TaskList
              tasks={props.selectedRoutine.tasks}
              updateTask={props.updateTask}
              deleteTask={props.deleteTask}
            ></TaskList>
          </section>
          <div>
            <button className="right-button" onClick={showFormOnClick}>
              <img src={add} alt="add icon" />
            </button>
          </div>
        </main>
      </>
    );
  }
};

EditRoutine.propTypes = {
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EditRoutine;
