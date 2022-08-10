import "../styles/EditRoutine.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import RoutineForm from "../components/RoutineForm";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

import add from "../assets/plus-circle.svg";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

const EditRoutine = (props) => {
  const { routine_id } = useParams();

  useEffect(() => props.fetchOneRoutine(routine_id), []);

  const showAddTaskOnClick = () => {
    props.setExpandedRow(0);
    props.setShowAddForm(!props.showAddForm);
  };

  const onRoutineDetailChange = (event) => {
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
    console.log("PUT: routine complete_time updated");
    console.log(props.selectedRoutine);
  };

  const onAddTaskChange = (event) => {
    const newTaskForm = { ...props.newTask };
    newTaskForm[event.target.name] = event.target.value;
    props.setNewTask(newTaskForm);
  };

  const submitNewTask = (event) => {
    event.preventDefault();
    props.addTask(props.newTask);
    props.setNewTask({
      title: "",
      time: 0,
      start_time: { hour: 0, minute: 0 },
    });
    console.log("POST: new task added");
    console.log(props.newTask);
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
                onFormChange={onRoutineDetailChange}
              ></RoutineForm>
              <div className="button-container">
                <input
                  className="update-button"
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
            <div>
              <button className="add-button" onClick={showAddTaskOnClick}>
                <img src={add} alt="add icon" />
              </button>
            </div>
            {props.showAddForm ? (
              <form className="task-form expanded" onSubmit={submitNewTask}>
                <TaskForm
                  selectedTask={props.selectedTask}
                  setSelectedTask={props.setSelectedTask}
                  onFormChange={onAddTaskChange}
                ></TaskForm>
                <input
                  className="add-button"
                  type="submit"
                  value="Add Task"
                  disabled={
                    props.newTask.title.length < 1 ||
                    props.newTask.title.length > 40 ||
                    props.newTask.time < 0
                  }
                ></input>
              </form>
            ) : (
              ""
            )}
          </section>
          <TaskList
            selectedRoutine={props.selectedRoutine}
            setSelectedRoutine={props.setSelectedRoutine}
            selectedTask={props.selectedTask}
            setSelectedTask={props.setSelectedTask}
            expandedRow={props.expandedRow}
            setExpandedRow={props.setExpandedRow}
            setShowAddForm={props.setShowAddForm}
            tasks={props.selectedRoutine.tasks}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          ></TaskList>
        </main>
      </>
    );
  }
};

EditRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  showAddForm: PropTypes.bool.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  newTask: PropTypes.object.isRequired,
  setNewTask: PropTypes.func.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EditRoutine;
