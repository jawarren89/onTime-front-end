import "../styles/EditRoutine.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import RoutineForm from "../components/RoutineForm";
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

  const onFormChange = (event) => {
    const updateRoutineForm = JSON.parse(JSON.stringify(props.selectedRoutine));
    updateRoutineForm[event.target.name] = event.target.value;
    props.setSelectedRoutine(updateRoutineForm);
  };

  const submitRoutineUpdate = (event) => {
    event.preventDefault();
    props.updateRoutine(
      props.selectedRoutine.routine_id,
      props.selectedRoutine
    );
    console.log("POST: new Routine Added");
    console.log(props.selectedRoutine);
  };

  if (props.isLoading) {
    return (
      <main className="loading-container">
        <h1 className="loading">Loading...</h1>
      </main>
    );
  } else {
    return (
      <>
        <main className="editpage-container">
          <h2 className="editpage-header">
            Edit Routine: {props.selectedRoutine.title}
          </h2>
          <p>You can do this, I believe in you.</p>
          <section className="routineform-container">
            <form onSubmit={submitRoutineUpdate}>
              <RoutineForm
                selectedRoutine={props.selectedRoutine}
                setSelectedRoutine={props.setSelectedRoutine}
                onFormChange={onFormChange}
              ></RoutineForm>
              <div className="button-container">
                <input
                  className="startButton"
                  type="submit"
                  value="Update Details"
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
            <h2 className="editpage-header">List your tasks here!</h2>
            <TaskList
              tasks={props.selectedRoutine.tasks}
              updateTask={props.updateTask}
              deleteTask={props.deleteTask}
            ></TaskList>
          </section>
          <div>
            <button className="add-button" onClick={showFormOnClick}>
              <img src={add} alt="add icon" />
            </button>
          </div>
        </main>
      </>
    );
  }
};

EditRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EditRoutine;
